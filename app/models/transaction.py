from .db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    paid_amount = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(100))
    expense_date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean)
    updated_at = db.Column(db.Date, nullable=False)

    expenses = db.relationship("TransactionExpense", back_populates="transaction", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="transaction", cascade="all, delete-orphan")
