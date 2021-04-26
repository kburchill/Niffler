from .db import db
from sqlalchemy.orm import relationship
from .group_membership import group_membership

class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    users = relationship("User",
                            secondary=group_membership,
                            back_populates="groups")
