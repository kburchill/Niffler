from app.models import db, Group, User


def seed_groups():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

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

    user1.groups.append(group1)
    user1.groups.append(group2)
    user1.groups.append(group3)
    user2.groups.append(group1)
    user2.groups.append(group2)
    user2.groups.append(group3)
    user3.groups.append(group1)
    user3.groups.append(group2)
    user3.groups.append(group3)
    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
