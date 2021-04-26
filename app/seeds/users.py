# from werkzeug.security import generate_password_hash
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='Demolition',
        last_name='Magician',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"
        )
    db.session.add(demo)

    harry = User(
        username='chosenone',
        email='harry@potter.com',
        password='lightning',
        first_name='Harry',
        last_name='Potter',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"
    )
    
    db.session.add(harry)

    snape = User(
        username='severous',
        email='severus@snape.com',
        password='Slytherin',
        first_name='Severus',
        last_name='Snape',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"
        )
    
    db.session.add(snape)

    hermione = User(
        username='granger',
        email='hermione@granger.com',
        password='gryffindor',
        first_name='Hermione',
        last_name='Granger',
        profile_pic_url="https://avatarfiles.alphacoders.com/121/thumb-1920-121391.jpg"
        )
    
    db.session.add(hermione)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
