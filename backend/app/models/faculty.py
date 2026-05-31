from app.database import db
from app.models.base import BaseModel


class Faculty(BaseModel):
    name = db.Column(db.String(255), nullable=False, comment="Tên khoa")

    university_id = db.Column(
        db.Integer,
        db.ForeignKey("university.id"),
        nullable=False,
        comment="Mã trường"
    )

    university = db.relationship(
        "University",
        back_populates="faculties"
    )

    majors = db.relationship(
        "Major",
        back_populates="faculty",
        lazy=True
    )

    users = db.relationship(
        "User",
        back_populates="faculty",
        lazy=True
    )

    def __repr__(self):
        return f"<Faculty {self.name}>"