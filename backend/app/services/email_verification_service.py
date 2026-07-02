import random
from datetime import datetime, timedelta

from app.repositories import base_repository
from app.database import db
from app.models.email_verification import EmailVerification


def create_email_verification_code(user):
    code = str(random.randint(100000, 999999))

    verification = EmailVerification(
        user_id=user.id,
        code=code,
        expires_at=datetime.utcnow() + timedelta(seconds=40),
        is_used=False
    )

    db.session.add(verification)
    db.session.commit()

    return code


def verify_email_code(user, code):
    verification = (
        EmailVerification.query
        .filter_by(
            user_id=user.id,
            code=code,
            is_used=False
        )
        .order_by(EmailVerification.created_at.desc())
        .first()
    )

    if verification is None:
        return False, "Mã xác thực không đúng"

    if datetime.utcnow() > verification.expires_at:
        return False, "Mã xác thực đã hết hạn"

    verification.is_used = True
    user.is_verified = True

    db.session.commit()

    return True, "Xác thực email thành công"
