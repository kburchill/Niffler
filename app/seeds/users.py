# from werkzeug.security import generate_password_hash
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    # User 1
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='Demolition',
        last_name='Magician',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(demo)

    harry = User(
        username='chosenone',
        email='harry@potter.com',
        password='lightning',
        first_name='Harry',
        last_name='Potter',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(harry)

    snape = User(
        username='severous',
        email='severus@snape.com',
        password='Slytherin',
        first_name='Severus',
        last_name='Snape',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(snape)

    hermione = User(
        username='granger',
        email='hermione@granger.com',
        password='gryffindor',
        first_name='Hermione',
        last_name='Granger',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(hermione)

    # User 5
    seamus = User(
        username='finnigan',
        email='seamus@finnigan.com',
        password='gryffindor',
        first_name='Seamus',
        last_name='Finnigan',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(seamus)

    dobby = User(
        username='i<3socks',
        email='dobby@harrypotterfan.com',
        password='gryffindor',
        first_name='Dobby',
        last_name='House-Elf',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(dobby)

    malfoy = User(
        username='potter stinks',
        email='potter@stinks.com',
        password='slytherin',
        first_name='Draco',
        last_name='Malfoy',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(malfoy)


    ron = User(
        username='cannons',
        email='chudley@cannons.com',
        password='gryffindor',
        first_name='Ronald',
        last_name='Weasley',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(ron)

    chang = User(
        username='tornadoes',
        email='tornadoes@fan.com',
        password='ravenclaw',
        first_name='Cho',
        last_name='Chang',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(chang)

    # User 10
    ernie = User(
        username='prefect',
        email='huff@prefect.com',
        password='hufflepuff',
        first_name='Ernie',
        last_name='MacMillian',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(ernie)

    abbott = User(
        username='abbott',
        email='hannah@abbott.com',
        password='hufflepuff',
        first_name='Hannah',
        last_name='Abbott',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(abbott)

    diggory = User(
        username='diggory',
        email='cedric@diggory.com',
        password='hufflepuff',
        first_name='Cedric',
        last_name='Diggory',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(diggory)

    crabbe = User(
        username='crabbe',
        email='vincent@crabbe.com',
        password='slytherin',
        first_name='Vincent',
        last_name='Crabbe',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(crabbe)

    goyle = User(
        username='goyle',
        email='gregory@goyle.com',
        password='slytherin',
        first_name='Gregory',
        last_name='Goyle',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"  # noqa
    )
    db.session.add(goyle)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
