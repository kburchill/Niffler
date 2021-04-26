from app.models import db, Transaction


def seed_transactions():

    demo1 = Transaction(
        transaction_id=1,
        lender_id=1,
        amount=40,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo1)

    demo2 = Transaction(
        transaction_id=2,
        lender_id=1,
        amount=600,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo2)

    demo3 = Transaction(
        transaction_id=3,
        lender_id=2,
        amount=20,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo3)

    demo4 = Transaction(
        transaction_id=4,
        lender_id=3,
        amount=20,
        completed="",
        updated_at="2020-09-05 09:45:28",
        )

    db.session.add(demo4)

    demo5 = Transaction(
        transaction_id=5,
        lender_id=2,
        amount=300,
        completed="",
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(demo5)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
