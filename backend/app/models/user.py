# app/models/user.py
from email.policy import default

from sqlalchemy import Enum

from app.database import db
from app.models.base import BaseModel
from enum import Enum as RoleEnum

class UserRole(RoleEnum):
    USER = 1
    SELLER = 2
    ADMIN = 3


class User(BaseModel):

    username = db.Column(db.String(50), unique=True, nullable=False,comment="Tên đăng nhập")
    email = db.Column(db.String(120), unique=True, nullable=False, comment="Email người dùng")
    password = db.Column(db.String(255), nullable=False,  comment="Mật khẩu")
    avatar = db.Column(db.String(255), nullable=True,comment="Ảnh đại diện")
    role = db.Column(Enum(UserRole), default=UserRole.USER,  comment="Vai trò: student / partner / admin")
    is_verified = db.Column(db.Boolean, default=False,  comment="Đã xác thực email hay chưa")

    full_name = db.Column(db.String(100), nullable=True,comment="Họ và tên")
    phone_number = db.Column(db.String(20),nullable=True,comment="Số điện thoại")
    date_of_birth = db.Column(db.Date, nullable=True, comment="Ngày tháng năm sinh")
    academic_start_year = db.Column(db.Integer, nullable=True, comment="Năm bắt đầu học")
    academic_end_year = db.Column(db.Integer, nullable=True,comment="Năm kết thúc học")
    is_graduated = db.Column(db.Boolean,default=False,comment="Đã tốt nghiệp hay chưa")

    university_id = db.Column(
        db.Integer,
        db.ForeignKey("university.id"),
        nullable=True,
        comment="Mã trường"
    )

    faculty_id = db.Column(
        db.Integer,
        db.ForeignKey("faculty.id"),
        nullable=True,
        comment="Mã khoa"
    )

    major_id = db.Column(
        db.Integer,
        db.ForeignKey("major.id"),
        nullable=True,
        comment="Mã ngành"
    )

    university = db.relationship(
        "University",
        back_populates="users"
    )

    faculty = db.relationship(
        "Faculty",
        back_populates="users"
    )

    major = db.relationship(
        "Major",
        back_populates="users"
    )

    # Một user có một ví
    wallet = db.relationship(
        "Wallet",
        back_populates="user",
        uselist=False
    )

    bank_account = db.relationship(
        "BankAccount",
        back_populates="user",
        uselist=False
    )

    def __repr__(self):
        return f"<User {self.username}>"