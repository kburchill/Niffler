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
    # How do we authenticate user is apart of group id

    if (current_user.is_authenticated):
        for group in current_user.groups:
            if group.id == int(group_id):
                group_transactions = Transaction.query.filter(Transaction.group_id == group_id).all()
                defined_transactions = {}
                for each_transaction in group_transactions:
                    defined_transactions[each_transaction.id] = each_transaction.expenses
                print(defined_transactions)

    return "5"
