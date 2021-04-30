"""empty message

Revision ID: 693dbbc63763
Revises: fbd55b04ab76
Create Date: 2021-04-30 14:20:11.224958

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '693dbbc63763'
down_revision = 'fbd55b04ab76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transaction_expenses', sa.Column('lender_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'transaction_expenses', 'users', ['lender_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'transaction_expenses', type_='foreignkey')
    op.drop_column('transaction_expenses', 'lender_id')
    # ### end Alembic commands ###