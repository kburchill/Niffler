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

    if current_user.is_authenticated:
        group_transactions = Transaction.query.filter(Transaction.group_id == group_id).all()

        # apart_group = group_membership.query.filter(and_(group_membership.group_id == group_id, group_membership.user_id == current_user.id)).all()
        defined_transactions = {}
        for each_transaction in group_transactions:
            details = TransactionExpense.query.filter(TransactionExpense.transaction_id == each_transaction.id).all()
            defined_transactions[each_transaction.id] = details

        print(defined_transactions, "here =======")
    return "5"
