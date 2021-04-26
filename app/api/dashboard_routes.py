from flask import Blueprint, session
from app.models import User, db
from flask_login import current_user


dashboard_routes = Blueprint("dashboard", __name__)


@dashboard_routes.route("/")
def dashboard_data():
    """
    Provides transactions current user
    """

    print(session.user.username)
    # return current_user.to_dict()
    return "3"
