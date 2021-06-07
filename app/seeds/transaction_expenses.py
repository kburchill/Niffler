from app.models import db, TransactionExpense


def seed_transaction_expenses():

    demo1 = TransactionExpense(
        transaction_id=1,
        borrower_id=2,
        lender_id=1,
        amount=33,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo1)

    demo2 = TransactionExpense(
        transaction_id=1,
        borrower_id=4,
        lender_id=1,
        amount=33,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo2)

    demo3 = TransactionExpense(
        transaction_id=2,
        borrower_id=11,
        lender_id=10,
        amount=16,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo3)

    demo4 = TransactionExpense(
        transaction_id=2,
        borrower_id=12,
        lender_id=10,
        amount=16,
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo4)

    demo5 = TransactionExpense(
        transaction_id=3,
        borrower_id=6,
        lender_id=5,
        amount=100,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo5)

    demo6 = TransactionExpense(
        transaction_id=3,
        borrower_id=8,
        lender_id=5,
        amount=100,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )
    db.session.add(demo6)

    demo7 = TransactionExpense(
        transaction_id=4,
        borrower_id=13,
        lender_id=3,
        amount=133,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo7)

    demo8 = TransactionExpense(
        transaction_id=4,
        borrower_id=14,
        lender_id=3,
        amount=133,
        completed=False,
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo8)

    db.session.commit()


def undo_transaction_expenses():
    db.session.execute('TRUNCATE transaction_expenses RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
