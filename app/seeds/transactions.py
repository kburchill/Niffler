from app.models import db, Transaction


def seed_transactions():

    x1 = Transaction(
        group_id=1,
        payer_id=1,
        paid_amount=100,
        description="The changing of monies",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        created_at="2020-09-05 09:45:28",
    )

    db.session.add(x1)

    x2 = Transaction(
        group_id=2,
        payer_id=1,
        paid_amount=100,
        description="The changing of other things",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        created_at="2020-09-05 09:45:28",
    )

    db.session.add(x2)

    x3 = Transaction(
        group_id=1,
        payer_id=1,
        paid_amount=100,
        description="The changing of MORE things",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        created_at="2020-09-05 09:45:28",
    )

    db.session.add(x3)

    x4 = Transaction(
        group_id=1,
        payer_id=1,
        paid_amount=100,
        description="The changing of lesser things",
        expense_date="2020-09-05 09:45:28",
        completed=False,
        created_at="2020-09-05 09:45:28",
    )

    db.session.add(x4)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
