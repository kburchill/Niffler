from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField, DateField, SelectMultipleField
from wtforms.validators import DataRequired

class ExpenseForm(FlaskForm):
    amount = IntegerField("amount", validators=[DataRequired()])
    payer_id = IntegerField("payer_id", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    group_id = IntegerField("group_id")
    expense_date = DateField("expense_date", validators=[DataRequired()])
    debtors = SelectMultipleField("debtors", coerce=int, choices=[(1, "Demolition"), (2, "Harry"), (3, "Hermione"), (4, "Ronald")])

