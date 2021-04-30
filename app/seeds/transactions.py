from app.models import db, Transaction


def seed_transactions():

    x1 = Transaction(
        group_id=1,
        payer_id=1,
        paid_amount=111,
        description="Butterbeer round one!",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x1)

    x2 = Transaction(
        group_id=2,
        payer_id=2,
        paid_amount=222,
        description="Butterbeer round 2!",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x2)

    x3 = Transaction(
        group_id=1,
        payer_id=3,
        paid_amount=333,
        description="New Owl",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        updated_at="2020-09-05 09:45:28",
    )

    db.session.add(x3)

    x4 = Transaction(
        group_id=2,
        payer_id=1,
        paid_amount=444,
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
