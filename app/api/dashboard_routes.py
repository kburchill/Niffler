from flask import Blueprint
from app.models import User, TransactionExpense, group_membership, Group
from flask_login import current_user
from sqlalchemy import or_, create_engine
from sqlalchemy.orm import sessionmaker, joinedload
import os

dashboard_routes = Blueprint("dashboard", __name__)
db_url = os.environ.get("DATABASE_URL")
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()


@dashboard_routes.route("/")
def dashboard_data():
    """
    Provides transactions current user
    """

    if current_user.is_authenticated:
        my_transactions = TransactionExpense.query.filter(or_(
            TransactionExpense.lender_id == current_user.id, TransactionExpense.borrower_id == current_user.id)).all()
        users_amounts = {}
        owed = 0
        owe = 0
        total = 0
        for transaction in my_transactions:
            amount = transaction.amount
            if transaction.borrower_id == current_user.id:
                total -= amount
                if transaction.lender_id in users_amounts:
                    users_amounts[transaction.lender_id] -= amount
                else:
                    users_amounts[transaction.lender_id] = (amount * -1)
            else:
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
        printthis = session.query(group_membership).options(joinedload(groups).filter(
            group_membership.c.user_id == current_user.id).all()
        print(printthis, "here ============")
        current_user_data = {"owed": owed, "owe": owe,
                             "total": total, "users_amounts": users_amounts}
        return current_user_data
#result = session.query(Customer).join(Invoice).filter(Invoice.amount == 8500)

    return {'errors': ['Unauthorized']}
