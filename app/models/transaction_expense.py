from .db import db


class TransactionExpense(db.Model):
    __tablename__ = "transaction_expenses"

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
    lender_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    borrower_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    amount = db.Column(db.Integer, nullable=False)
    completed = db.Column(db.Boolean)
    updated_at = db.Column(db.Date, nullable=False)
