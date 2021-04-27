from flask.cli import AppGroup
from .users import seed_users, undo_users
from .transactions import seed_transactions, undo_transactions
from .transaction_expenses import seed_transaction_expenses, undo_transaction_expenses  # noqa
from .comments import seed_comments, undo_comments
from .groups import seed_groups, undo_groups
# from .group_memberships import seed_group_memberships, undo_group_memberships

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_groups()
    seed_transactions()
    seed_transaction_expenses()
    # seed_group_memberships()
    seed_comments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_transactions()
    undo_transaction_expenses()
    undo_comments()
    # undo_group_memberships()
