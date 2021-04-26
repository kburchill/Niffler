from .db import db

group_membership = db.Table(
    "group_membership",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("group_id", db.Integer, db.ForeignKey(
        "groups.id"), primary_key=True),
)
