from flask import Blueprint, session
from app.models import User, db, TransactionExpense
from flask_login import current_user
from sqlalchemy import or_


dashboard_routes = Blueprint("dashboard", __name__)


@dashboard_routes.route("/")
def dashboard_data():
    """
    Provides transactions current user
    """

    if current_user.is_authenticated:
        my_transactions = TransactionExpense.query.filter(or_(
            TransactionExpense.lender_id == current_user.id, TransactionExpense.borrower_id == current_user.id)).all()  # noqa
        print(my_transactions, "here ==========")
        users_amounts = {}
        totals = {}
        owed = 0
        owe = 0
        total = 0
        for transaction in my_transactions:

            amount = transaction.amount
            if transaction.borrower_id == current_user.id:
                # owe += amount
                total -= amount
                if transaction.lender_id in users_amounts:
                    users_amounts[transaction.lender_id] -= amount
                else:
                    users_amounts[transaction.lender_id] = (amount * -1)
            else:
                # owed += amount
                total += amount
                if transaction.borrower_id in users_amounts:
                    users_amounts[transaction.borrower_id] += amount
                else:
                    users_amounts[transaction.borrower_id] = amount
        for user_id, user_amount in users_amounts.items():
            if user_amount > 0:
                owed += user_amount
            else:
                owe += user_amount
        totals = {"owed": owed, "owe": owe, "total": total, "users_amounts": users_amounts}

        return totals

    return {'errors': ['Unauthorized']}
