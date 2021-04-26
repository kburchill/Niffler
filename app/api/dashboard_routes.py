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
            TransactionExpense.lender_id == current_user.id, TransactionExpense.borrower_id == current_user.id)).all()
        print(my_transactions, "here ==========")
        trans1amount = my_transactions[0].amount
        users_amounts = {}
        totals = {}
        owed = 0
        owe = 0
        total = 0
        test change

        return 'my_transactions'

    return {'errors': ['Unauthorized']}
