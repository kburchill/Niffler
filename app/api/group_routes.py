from flask import Blueprint, request
from app.models import User, TransactionExpense, group_membership, Group, Transaction, db
from flask_login import current_user
from sqlalchemy import or_, and_
import os
from app.forms import GroupForm
from app.api.auth_routes import validation_errors_to_error_messages


group_routes = Blueprint("groups", __name__)


@group_routes.route("/<group_id>")
def group_data(group_id):
    """
    Provides transactions for current group id
    """
    if (current_user.is_authenticated):
        if any(group.id == int(group_id) for group in current_user.groups):
            # queries
            group_transactions = Transaction.query.filter(
                Transaction.group_id == group_id).all()
            group_data = Group.query.get(int(group_id))
            # create variables to organize data
            all_transactions_for_group = {}
            # Create list of expenses associated with transaction
            for transaction in group_transactions:
                current_user_lender = "You"
                all_expenses = [*transaction.expenses]
                transaction_info = []
                total_debt_owed = 0
                # Go through each expense and organize database info
                for expense in all_expenses:
                    a_user = next(
                        user for user in group_data.users if expense.borrower_id == user.id)
                    # Get the name of person that paid
                    users = group_data.users
                    group_users = []
                    for user in users:
                        if (user.id == transaction.payer_id) and not (current_user.id == transaction.payer_id):
                            current_user_lender = user.first_name
                        # Create list of users in the group not including the current user.
                        if current_user.id != user.id:
                            group_users.append({"user_id": user.id, "username": user.username,
                                                "first_name": user.first_name, "last_name": user.last_name,
                                                "profile_pic_url": user.profile_pic_url})
                    total_debt_owed += expense.amount

                    # Append data onto transacition info
                    transaction_info.append({"payer_id": transaction.payer_id, "paid_amount": transaction.paid_amount, "expense_date": transaction.expense_date, "borrower_id": a_user.id,
                                             "first_name": a_user.first_name, "amount": expense.amount, "description": transaction.description, "transaction_id": transaction.id, "current_user_lender": current_user_lender, "total_debt_owed": total_debt_owed})
                # Create dict entry in {transaction.id: info} form
                all_transactions_for_group[transaction.id] = transaction_info
                full_frontend_data = {"transaction_info": all_transactions_for_group, "users": group_users, "group_name": group_data.name}

            return full_frontend_data
        return {'errors': ['Unauthorized']}, 401
    return {'errors': ['Unauthorized']}, 401


# Create Group POST Route
@group_routes.route("/create", methods=['POST'])
def create_group():
    """
    Creates a new group
    """
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        group = Group(
            name=form.data['name'],
        )
        db.session.add(group)

        # get user id's to add, get user objects, and add user to group object.
        for user_id in form.data["users"]:
            user_in_group = User.query.get(user_id)
            group.users.append(user_in_group)
        db.session.commit()
        return {'message': 'Group Created!'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# PUT Group Route
@group_routes.route("/<group_id>", methods=["PUT"])
def update_group(group_id):
    """
    Updates a group
    """
    group_to_update = Group.query.get(group_id)
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']
        group_to_update.name = name

        # reset group's users array.
        group_users = []
        for user_id in form.data["users"]:
            user_in_group = User.query.get(user_id)
            group_users.append(user_in_group)

        group_to_update.users = group_users

        db.session.commit()
        return {'message': 'Group Updated!'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Delete Group DELETE Route
@group_routes.route("/<group_id>", methods=["DELETE"])
# Is this correct?
def delete_group(group_id):
    """
    Deletes a group
    """
    group_to_delete = Group.query.get(group_id)
    db.session.delete(group_to_delete)
    db.session.commit()
    return {'message': 'Group Deleted!'}
