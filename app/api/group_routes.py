# pylint: disable=too-many-lines

from flask import Blueprint, request
# @kent @Min Ki do we need what we don't use here?
from app.models import User, TransactionExpense, group_membership, Group, Transaction, db
from flask_login import current_user
from sqlalchemy import or_, and_
import os
from app.forms import CreateGroupForm


group_routes = Blueprint("groups", __name__)


@group_routes.route("/<group_id>")
def group_data(group_id):
    """
    Provides transactions for current group id
    """
    print("I happened ==========")
    if (current_user.is_authenticated):
        if any(group.id == int(group_id) for group in current_user.groups):
            #queries
            group_transactions = Transaction.query.filter(Transaction.group_id == group_id).all()
            group_data = Group.query.get(int(group_id))
            #create variables to organize data
            return_me_to_frontend = {}

            #Create list of expenses associated with transaction
            for transaction in group_transactions:
                all_expenses = [*transaction.expenses]
                Debtor_info = []
                for expense in all_expenses:
                    a_user = next(user for user in group_data.users if expense.borrower_id == user.id)
                    Debtor_info.append({a_user.id: {"name": a_user.first_name, "Amount": expense.amount}})
                    # print(Debtor_info)
                return_me_to_frontend[transaction.id] = {
                    "Payer": transaction.payer_id, "Amount": transaction.paid_amount, "Date": transaction.expense_date,
                    "Debtors": Debtor_info
                }
        return return_me_to_frontend

# Create Group POST Route
@group_routes.route("/create", methods=['POST'])
def create_group():
    """
    Creates a new group
    """
    form = CreateGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("=====", request.get_json())
    if form.validate_on_submit():
        print("Form validated correctly")
        user = User.query.get(1)
        group = Group(
            name=form.data['name']
        )
        db.session.add(group)
        group.users.append(user) # this gets replaced by what's underneath
        # users = form.data
        # query loop (will fill in more detailed notes later)
        # groups.user.append(user) # append each user separately
        db.session.commit()
        return 'Group Created!'
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return "4"
