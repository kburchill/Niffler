from flask import Blueprint, request
from flask_login import current_user
from app.forms import ExpenseForm


expense_routes = Blueprint("expenses", __name__)

@expense_routes.route("/", methods=["POST"])
def create_expense():
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("validated successfully")
    return {}