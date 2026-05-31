from app.database import db
from app.models.base import BaseModel
from enum import Enum as RoleEnum
from sqlalchemy import Enum
class SchoolType(RoleEnum):
    Public = 1
    Private = 2
    International = 3


class University(BaseModel):
    name = db.Column(db.String(255), nullable=False, unique=True, comment="Tên trường")
    code = db.Column(db.String(50), nullable=True, unique=True, comment="Mã trường")
    province = db.Column(db.String(100), nullable=True, comment="Tỉnh/Thành phố")
    type = db.Column(Enum(SchoolType), nullable=True, comment="Loại trường: công lập / tư thục / quốc tế")

    faculties = db.relationship(
        "Faculty",
        back_populates="university",
        lazy=True
    )

    users = db.relationship(
        "User",
        back_populates="university",
        lazy=True
    )

    def __repr__(self):
        return f"<University {self.name}>"