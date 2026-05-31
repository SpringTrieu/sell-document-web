from app.database import db
from app.models.base import BaseModel


class Major(BaseModel):
    name = db.Column(db.String(255), nullable=False, comment="Tên ngành")

    faculty_id = db.Column(
        db.Integer,
        db.ForeignKey("faculty.id"),
        nullable=False,
        comment="Mã khoa"
    )

    faculty = db.relationship(
        "Faculty",
        back_populates="majors"
    )

    users = db.relationship(
        "User",
        back_populates="major",
        lazy=True
    )

    def __repr__(self):
        return f"<Major {self.name}>"