from flask import Blueprint, request
from flask_login import current_user
from app.forms import ExpenseForm
from app.models import Transaction, TransactionExpense, db
from datetime import date
from app.api.auth_routes import validation_errors_to_error_messages

expense_routes = Blueprint("expenses", __name__)


@expense_routes.route("/", methods=["POST"])
def create_expense():
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Create the new transaction.
        new_transaction = Transaction(
            group_id=form.data["group_id"],
            payer_id=form.data["payer_id"],
            paid_amount=form.data["amount"],
            description=form.data["description"],
            expense_date=form.data["expense_date"],
            completed=False,
            created_at=date.today()
        )
        db.session.add(new_transaction) 
        db.session.commit()

        # For each debtor, create a new transaction expense.
        payed_amount = form.data["amount"]
        split_by = len(form.data["debtors"]) + 1
        remainder = payed_amount % split_by
        debtor_pays = (payed_amount - remainder) / split_by
        for debtor in form.data["debtors"]:
            new_expense = TransactionExpense(
                transaction_id=new_transaction.id,
                lender_id=form.data["payer_id"],
                borrower_id=debtor,
                amount=debtor_pays,
                completed=False,
                updated_at=date.today()
            )
            db.session.add(new_expense) 
        db.session.commit()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400