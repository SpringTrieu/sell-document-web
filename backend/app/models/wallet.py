from app.database import db
from app.models.base import BaseModel


class Wallet(BaseModel):

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        unique=True,
        nullable=False,
        comment="Mã người dùng sở hữu ví"
    )

    total_income = db.Column(
        db.Float,
        default=0,
        nullable=False,
        comment="Tổng doanh thu đã kiếm được"
    )

    total_job_income = db.Column(
        db.Float,
        default=0,
        nullable=False,
        comment="Tổng doanh thu từ job"
    )

    total_document_income = db.Column(
        db.Float,
        default=0,
        nullable=False,
        comment="Tổng doanh thu từ bán tài liệu"
    )

    user = db.relationship(
        "User",
        back_populates="wallet"
    )

    def __repr__(self):
        return f"<Wallet user_id={self.user_id} total_income={self.total_income}>"