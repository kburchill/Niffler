from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired, ValidationError
from app.models import Group


class CreateGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    # Make into select
    # users = StringField('name', validators=[DataRequired()])

    # users = SelectMultipleField('Users', choices=[(1, 'Harry Potter'), (2, 'Severus Snape')])
    users = StringField('users')
    # (
    #     'Users', choices=[(1, 'Harry Potter'), (2, 'Severus Snape')])

    users = 1
