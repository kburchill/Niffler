from app.models import db, TransactionExpense


def seed_transaction_expenses():

    demo1 = TransactionExpense(
        transaction_expense_id=1,
        lender_id=1,
        amount=40,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo1)

    demo2 = TransactionExpense(
        transaction_expense_id=2,
        lender_id=1,
        amount=600,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo2)

    demo3 = TransactionExpense(
        transaction_expense_id=3,
        lender_id=2,
        amount=20,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo3)

    demo4 = TransactionExpense(
        transaction_expense_id=4,
        lender_id=3,
        amount=20,
        completed="",
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo4)

    demo5 = TransactionExpense(
        transaction_expense_id=5,
        lender_id=2,
        amount=300,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo5)

    db.session.commit()


def undo_transaction_expenses():
    db.session.execute('TRUNCATE transaction_expenses RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
