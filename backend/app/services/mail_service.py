from flask_mail import Message
from app.database import mail


def send_verification_email(to_email, code):
    subject = "Mã xác thực email - Học Tốt"

    body = f"""
Xin chào,

Mã xác thực email của bạn là: {code}

Mã này có hiệu lực trong 40 giây.

Nếu bạn không yêu cầu xác thực email, vui lòng bỏ qua email này.

Học Tốt
"""

    message = Message(
        subject=subject,
        recipients=[to_email],
        body=body
    )

    mail.send(message)
