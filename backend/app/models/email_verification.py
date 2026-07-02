from datetime import datetime
from app.database import db
from app.models.base import BaseModel


class EmailVerification(BaseModel):
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False,
        comment="User cần xác thực email"
    )

    code = db.Column(
        db.String(10),
        nullable=False,
        comment="Mã xác thực email"
    )

    expires_at = db.Column(
        db.DateTime,
        nullable=False,
        comment="Thời gian hết hạn mã"
    )

    is_used = db.Column(
        db.Boolean,
        default=False,
        comment="Mã đã được sử dụng hay chưa"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        comment="Thời gian tạo mã"
    )

    user = db.relationship("User", backref="email_verifications")
