#app/repositories/
from app.database import db


def save(entity):
    db.session.add(entity)
    db.session.commit()
    return entity


def delete(entity):
    db.session.delete(entity)
    db.session.commit()


def commit():
    db.session.commit()


def rollback():
    db.session.rollback()