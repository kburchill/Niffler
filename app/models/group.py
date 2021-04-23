from .db import db


class Group(db.Model):
  __tablename__ = "groups"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
