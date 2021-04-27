from .db import db


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
    content = db.Column(db.String(500), nullable=False)
