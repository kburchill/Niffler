from .db import db


class Transaction(db.Model):
  __tablename__ = "transactions"

  id = db.Column(db.Integer, primary_key = True)
  groupId = db.Column(db.Integer, db.ForeignKey("groups.id"))
  description = db.Column(db.String(100))
  expenseDate = db.Column(db.Date, nullable = False)
  completed = db.Column(db.Boolean)
  createdAt = db.Column(db.Date, nullable = False)
