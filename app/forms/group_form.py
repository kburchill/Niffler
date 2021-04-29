from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired, ValidationError
from app.models import Group

class GroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    
    # Will eventually have to dynamically generate choices.
    users = SelectMultipleField('users', coerce=int, choices=[(1, "Demolition"), (2, "Harry"), (3, "Hermione"), (4, "Ronald")])
