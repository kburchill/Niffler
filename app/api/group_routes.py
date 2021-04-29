from flask import Blueprint, request
# @kent @Min Ki do we need what we don't use here?
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
            #queries
            group_transactions = Transaction.query.filter(Transaction.group_id == group_id).all()
            group_data = Group.query.get(int(group_id))
            #create variables to organize data
            return_me_to_frontend = {}

            #Create list of expenses associated with transaction
            for transaction in group_transactions:
                current_user_lender = ""

                all_expenses = [*transaction.expenses]
                Debtor_info = []
                for expense in all_expenses:
                    a_user = next(user for user in group_data.users if expense.borrower_id == user.id)
                    print(transaction.payer_id, "this is the payer_id")
                    print(a_user.id, "the current user id is here")
                    if transaction.payer_id == current_user.id:
                        current_user_lender = "You"
                    elif transaction.payer_id == a_user.id:
                        current_user_lender = a_user.first_name
                    else:
                        current_user_lender = "Mismatch database info"
                    Debtor_info.append({"payer_id": transaction.payer_id, "paid_amount": transaction.paid_amount, "expense_date": transaction.expense_date, "borrower_id": a_user.id, "first_name": a_user.first_name, "amount": expense.amount, "description": transaction.description, "transaction_id": transaction.id, "current_user_lender": current_user_lender})
                return_me_to_frontend[transaction.id] = Debtor_info
            print("START HERE =======")
            print(return_me_to_frontend, "END HERE =========")
            return return_me_to_frontend
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Create Group POST Route
@group_routes.route("/create", methods=['POST'])
def create_group():
    """
    Creates a new group
    """
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(request.get_json(), "<======= JSON response here")

    if form.validate_on_submit():
        group = Group(
            name=form.data['name'],
        )
        db.session.add(group)

        # print(form.data["users"], "here =========")

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
        # print('Check==============')
        name = form.data['name']
        group_to_update.name = name
        # name = group_to_update.name
        # group = Group(
        # name=form.data[name],
        # )

    #     # print(form.data["users"], "here =========")

    #     for user_id in form.data["users"]:
    #         user_in_group = User.query.get(user_id)
    #         group.users.append(user_in_group)
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
