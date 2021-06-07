from app.models import db, Group, User


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

    # Demo User -> All Groups
    user1 = User.query.get(1)
    user1.groups.append(group1)
    user1.groups.append(group2)
    user1.groups.append(group3)
    user1.groups.append(group4)

    # Harry -> Gryffindor
    user2 = User.query.get(2)
    user2.groups.append(group1)

    # Snape -> Slytherin
    user3 = User.query.get(3)
    user3.groups.append(group4)

    # Hermione -> Gryffindor
    user4 = User.query.get(4)
    user4.groups.append(group1)

    # Seamus -> Gryffindor
    user5 = User.query.get(5)
    user5.groups.append(group1)

    # Dobby -> All Groups
    user6 = User.query.get(6)
    user6.groups.append(group1)
    user6.groups.append(group2)
    user6.groups.append(group3)
    user6.groups.append(group4)

    # Malfoy -> Slytherin
    user7 = User.query.get(7)
    user7.groups.append(group4)

    # Ron -> Gryffindor
    user8 = User.query.get(8)
    user8.groups.append(group1)

    # Cho -> Ravenclaw
    user9 = User.query.get(9)
    user9.groups.append(group2)

    # Ernie -> Hufflepuff
    user10 = User.query.get(10)
    user10.groups.append(group3)

    # Hannah -> Hufflepuff
    user11 = User.query.get(11)
    user11.groups.append(group3)

    # Cedric -> Hufflepuff
    user12 = User.query.get(12)
    user12.groups.append(group3)

    # Crabbe -> Slytherin
    user13 = User.query.get(13)
    user13.groups.append(group4)

    # Goyle -> Slytherin
    user14 = User.query.get(14)
    user14.groups.append(group4)

    db.session.commit()


def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
