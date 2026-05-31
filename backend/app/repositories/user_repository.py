#app/repositories/
from app.models.user import User


def get_user_by_id(user_id):
    return User.query.get(user_id)


def get_user_by_username(username):
    return User.query.filter_by(username=username).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def get_all_users():
    return User.query.all()


def is_username_exists(username):
    return get_user_by_username(username) is not None


def is_email_exists(email):
    return get_user_by_email(email) is not None

def get_user_by_email_or_username(account):
    return User.query.filter(
        (User.email == account) | (User.username == account)
    ).first()