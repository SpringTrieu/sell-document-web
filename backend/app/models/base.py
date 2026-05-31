# app/models/base.py

from datetime import datetime
from app.database import db


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_date = db.Column(db.DateTime, default=datetime.now)
    active = db.Column(db.Boolean, default=True)

    def __str__(self):
        return self.name if self.name else str(self.id)