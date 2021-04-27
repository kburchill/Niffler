from app.models import db, group_membership
from alembic import op


def seed_group_memberships():

    # group1 = Group(
    #     name="Gryffindor"
    # )

    # db.session.add(group1)
    op.bulk_insert(group_membership, [
        {'user_id': 2, 'group_id': 1},
        {'user_id': 3, 'group_id': 1},
        {'user_id': 1, 'group_id': 2},
        {'user_id': 2, 'group_id': 2},
        {'user_id': 2, 'group_id': 2},
    ])


# db.session.commit()


def undo_group_memberships():
    db.session.execute('TRUNCATE group_membership RESTART IDENTITY CASCADE;')
    db.session.commit()
