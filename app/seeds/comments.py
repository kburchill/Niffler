from app.models import db, Comment, transaction


def seed_comments():
    comment1 = Comment(
        user_id=2,
        transaction_id=2,
        content="Wizarding Worlds, here I come!"
    )

    db.session.add(comment1)

    comment2 = Comment(
        user_id=2,
        transaction_id=1,
        content="Wizarding Worlds, maybe someday!"
    )

    db.session.add(comment2)

    comment3 = Comment(
        user_id=3,
        transaction_id=1,
        content="Take me with you!"
    )

    db.session.add(comment3)

    comment4 = Comment(
        user_id=2,
        transaction_id=1,
        content="Me Three!"
    )

    db.session.add(comment4)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
