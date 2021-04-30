from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField, DateField, SelectMultipleField, BooleanField
from wtforms.validators import DataRequired, ValidationError

def amount_correct(form, field):
    print("Checking if payed amount is not zero and not negative", field.data)
    amount = field.data
    if amount < 1:
        raise ValidationError("Incorrect payed amount.")

class ExpenseForm(FlaskForm):
    amount = IntegerField("amount", validators=[DataRequired(), amount_correct])
    payer_id = IntegerField("payer_id", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    group_id = IntegerField("group_id")
    expense_date = DateField("expense_date", validators=[DataRequired()])
    # Will eventually have to dynamically generate choices.
    debtors = SelectMultipleField("debtors", coerce=int)
    completed = BooleanField("completed")

