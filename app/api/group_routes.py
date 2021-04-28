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
        print("user====is====authenticated")
        if any(group.id == int(group_id) for group in current_user.groups):
            group_transactions = Transaction.query.filter(Transaction.group_id == group_id).all()
            defined_transactions = {}
            for each_transaction in group_transactions:
                defined_transactions[each_transaction.id] = each_transaction.expenses
            group_data = Group.query.get(int(group_id))
            print(defined_transactions, "============")
            # {1: <all transactions associated>}
            # {(for (1) get payer id/name:)
            # (for each transaction, get lent amount total, {and each user id/name/lent amount}}
            # return_me_to_frontend = {}
            # for transaction in group_transactions:
            #     for expense in transaction:
            #         name = name for expense.lender_id in group_data
            #         Debtor_info = {
            #             expense.lender_id: {"name": [name for expense.lender_id in group_data], "amount": expense.amount}
            #         }
            #     return_me_to_frontend[transaction.id] = {
                    # {
                    # Payer: Kent, Amount: 100, Date: 5/5/2020 Debtors: {user_id(1): {name: Min Ki, amount: 25}, user_id(2): { name: Steve, amount: 25}
                    # }
                #     "Payer": transaction.payer, "Amount": transaction.amount, "Date": transaction.date,
                #     "Debtors": {


                #     }
                # }

## What do we want to display?
## Transaction description, paid amount, lent amount, User and their expense amount

## What do we have access to?
## Transaction description (group_transaction[0].description)
## Paid amount >> add onto database
## lent amount >> total up from each transactions
# {
# (transaction)1: {Payer: Kent, Amount: 100, Date: 5/5/2020 Debtors: {user_id(1): {name: Min Ki, amount: 25}, user_id(2): { name: Steve, amount: 25}}
# }
#

##
    return "5"
