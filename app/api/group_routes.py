from flask import Blueprint
from app.models import User, TransactionExpense, group_membership, Group, Transaction
from flask_login import current_user
from sqlalchemy import or_, and_
import os


group_routes = Blueprint("groups", __name__)


@group_routes.route("/<group_id>")
def group_data(group_id):
    """
    Provides transactions for current group id
    """
    if (current_user.is_authenticated):
        # print("user====is====authenticated")
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
            print(return_me_to_frontend)
# # What do we want to display?
# # Transaction description, paid amount, lent amount, User and their expense amount

# # What do we have access to?
# # Transaction description (group_transaction[0].description)
# # Paid amount >> add onto database
# # lent amount >> total up from each transactions
# {
# (transaction)1: {Payer: Kent, Amount: 100, Date: 5/5/2020 Debtors: {user_id(1): {name: Min Ki, amount: 25}, user_id(2): { name: Steve, amount: 25}}
# }


# #
    return "5"
