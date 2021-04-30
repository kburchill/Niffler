from flask import Blueprint, request
from flask_login import current_user
from app.forms import ExpenseForm
from app.models import Transaction, TransactionExpense, Group, db
from datetime import date
from app.api.auth_routes import validation_errors_to_error_messages

expense_routes = Blueprint("expenses", __name__)

@expense_routes.route("/", methods=["POST"])
def create_expense():
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    form.debtors.choices = [(user.id, user.first_name) for user in Group.query.get(form.data["group_id"]).users if user.id != form.data["payer_id"]]

    if form.validate_on_submit():
        # Create the new transaction.
        new_transaction = Transaction(
            group_id=form.data["group_id"],
            payer_id=form.data["payer_id"],
            paid_amount=form.data["amount"],
            description=form.data["description"],
            expense_date=form.data["expense_date"],
            completed=False,
            updated_at=date.today()
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
        return {'message': 'Transaction Created!'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@expense_routes.route("/<int:transaction_id>", methods=["PATCH"])
def edit_expense(transaction_id):
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    form.debtors.choices = [(user.id, user.first_name) for user in Group.query.get(form.data["group_id"]).users if user.id != form.data["payer_id"]]

    if form.validate_on_submit():
        # Edit the transaction.
        transaction_to_edit = Transaction.query.get(transaction_id)
        transaction_to_edit.group_id = form.data["group_id"]
        transaction_to_edit.payer_id = form.data["payer_id"]
        transaction_to_edit.paid_amount = form.data["amount"]
        transaction_to_edit.description = form.data["description"]
        transaction_to_edit.expense_date = form.data["expense_date"]
        transaction_to_edit.completed = False
        transaction_to_edit.updated_at = date.today()
        db.session.commit()


        # For each debtor, update or delete their expense.
        payed_amount = form.data["amount"]
        split_by = len(form.data["debtors"]) + 1
        remainder = payed_amount % split_by
        debtor_pays = (payed_amount - remainder) / split_by

        new_debtors = form.data["debtors"]

        for previous_expense in transaction_to_edit.expenses:
            previous_debtor = previous_expense.borrower_id
            if previous_debtor in new_debtors:
                previous_expense.lender_id = form.data["payer_id"]
                previous_expense.amount = debtor_pays
                previous_expense.completed = form.data["completed"]
                previous_expense.updated_at = date.today()
                new_debtors.remove(previous_debtor)
            else:
                db.session.delete(previous_expense)
        
        for new_debtor in new_debtors:
            new_expense = TransactionExpense(
                transaction_id=transaction_to_edit.id,
                lender_id=form.data["payer_id"],
                borrower_id=new_debtor,
                amount=debtor_pays,
                completed=form.data["completed"],
                updated_at=date.today()
            )
            db.session.add(new_expense) 
    
        db.session.commit()
        return {'message': 'Transaction Updated!'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@expense_routes.route("/<int:transaction_id>", methods=["DELETE"])
def delete_group(transaction_id):
    transaction_to_delete = Transaction.query.get(transaction_id)
    db.session.delete(transaction_to_delete)
    db.session.commit()
    return {'message': 'Expense Deleted.'}