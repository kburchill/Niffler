from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Group


class CreateGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
