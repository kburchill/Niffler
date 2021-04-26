from app.models import db, Group


def seed_groups():

    group1 = Group(
        name="Gryffindor"
    )

    db.session.add(group1)

    group2 = Group(
        name="Ravenclaw"
    )

    db.session.add(group2)

    group3 = Group(
        name="Hufflepuff"
    )

    db.session.add(group3)

    group4 = Group(
        name="Slytherin"
    )

    db.session.add(group4)


db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
