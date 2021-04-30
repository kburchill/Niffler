from app.models import db, TransactionExpense


def seed_transaction_expenses():

    demo1 = TransactionExpense(
        transaction_id=1,
        borrower_id=3,
        amount=13,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo1)

    demo2 = TransactionExpense(
        transaction_id=1,
        borrower_id=2,
        amount=12,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo2)

    demo3 = TransactionExpense(
        transaction_id=2,
        borrower_id=1,
        amount=21,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo3)

    demo4 = TransactionExpense(
        transaction_id=2,
        borrower_id=3,
        amount=23,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo4)

    demo5 = TransactionExpense(
        transaction_id=3,
        borrower_id=1,
        amount=31,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo5)

    demo6 = TransactionExpense(
        transaction_id=3,
        borrower_id=2,
        amount=32,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )
    db.session.add(demo6)

    demo7 = TransactionExpense(
        transaction_id=4,
        borrower_id=2,
        amount=42,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo7)

    demo8 = TransactionExpense(
        transaction_id=4,
        borrower_id=3,
        amount=43,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo8)

    db.session.commit()


def undo_transaction_expenses():
    db.session.execute('TRUNCATE transaction_expenses RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
