from app.models import db, Transaction


def seed_transactions():

    x1 = Transaction(
        group_id=1,
        payer_id=1,
        paid_amount=100,
        description="Butterbeer round one!",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x1)

    x2 = Transaction(
        group_id=3,
        payer_id=10,
        paid_amount=50,
        description="Butterbeer round 2!",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x2)

    x3 = Transaction(
        group_id=1,
        payer_id=5,
        paid_amount=300,
        description="New Owl",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x3)

    x4 = Transaction(
        group_id=4,
        payer_id=3,
        paid_amount=400,
        description="Broomstick",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x4)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
