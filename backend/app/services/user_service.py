from app.repositories import base_repository
from app.repositories import user_repository


def get_user_profile(user_id):
    return user_repository.get_user_by_id(user_id)


def update_user(user):
    return base_repository.save(user)


def delete_user(user):
    base_repository.delete(user)