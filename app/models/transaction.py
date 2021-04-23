from .db import db


class Transaction(db.Model):
  __tablename__ = "transactions"

  id = db.Column(db.Integer, primary_key = True)
  group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
  description = db.Column(db.String(100))
  expense_date = db.Column(db.Date, nullable = False)
  completed = db.Column(db.Boolean)
  created_at = db.Column(db.Date, nullable = False)
