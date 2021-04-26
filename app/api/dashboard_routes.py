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
        my_transactions = TransactionExpense.query.filter(or_(TransactionExpense.lender_id == current_user.id, 
                                                              TransactionExpense.borrower_id == current_user.id)).all()
        associated_users_data = {}
        owed = 0
        owe = 0
        total = 0

        for transaction in my_transactions:
            amount = transaction.amount
            if transaction.borrower_id == current_user.id:
                total -= amount
                if transaction.lender_id in associated_users_data:
                    associated_users_data[transaction.lender_id] -= amount
                else:
                    associated_users_data[transaction.lender_id] = (amount * -1)
            else:
                total += amount
                if transaction.borrower_id in associated_users_data:
                    associated_users_data[transaction.borrower_id] += amount
                else:
                    associated_users_data[transaction.borrower_id] = amount

        for user_id, user_amount in associated_users_data.items():
            if user_amount > 0:
                owed += user_amount
            else:
                owe += user_amount

        user_groups = {}
        for group in current_user.groups:
            user_groups[group.id] = group.name

        # list of user(model) objects
        other_users = User.query.filter(User.id.in_(associated_users_data)).all()

        for user in associated_users_data:
            # find the corresponding user(model) instance
            user_instance = next(u for u in other_users if u.id == user)

            user_amount = associated_users_data[user]
            associated_users_data[user] = { "amount": user_amount, "username": user_instance.username, 
                "first_name": user_instance.first_name, "last_name": user_instance.last_name, 
                "profile_pic_url":user_instance.profile_pic_url }


        current_user_data = {"owed": owed, "owe": owe, "total": total, "associated_users_data": associated_users_data, "user_groups": user_groups}
        return current_user_data

    return {'errors': ['Unauthorized']}
