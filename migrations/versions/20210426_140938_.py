"""empty message

Revision ID: b61e61131b73
Revises: d6d1b4a03626
Create Date: 2021-04-26 14:09:38.544422

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b61e61131b73'
down_revision = 'd6d1b4a03626'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('first_name', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('profile_pic_url', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('total_debt', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('total_owed', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'total_owed')
    op.drop_column('users', 'total_debt')
    op.drop_column('users', 'profile_pic_url')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    # ### end Alembic commands ###
