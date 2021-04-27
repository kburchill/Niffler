from app.models import db, Transaction


def seed_transactions():

    transX1 = Transaction(
        group_id=1,
        description="The changing of monies",
        expense_date="2020-09-05 09:45:28",
        completed="",
        created_at="2020-09-05 09:45:28",
    )

    db.session.add(transX1)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')  # noqa
    db.session.commit()
