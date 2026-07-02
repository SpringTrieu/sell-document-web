import random
import re

from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from app.models.user import User, GenderRole
from app.repositories import base_repository
from app.repositories.user_repository import is_username_exists, is_email_exists, get_user_by_email_or_username
from datetime import datetime

from app.models.university import University
from app.models.faculty import Faculty
from app.models.major import Major
from app.repositories.user_repository import get_user_by_id
from app.database import db


def validate_register_data(data):
    full_name = data.get("full_name", "").strip()
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not full_name or not username or not email or not password:
        return False, "Vui lòng nhập đầy đủ thông tin"

    if is_username_exists(username):
        return False, "Username đã tồn tại"

    if is_email_exists(email):
        return False, "Email đã tồn tại"

    if len(password) < 8:
        return False, "Mật khẩu phải có ít nhất 8 ký tự"

    if not re.search(r"[A-Z]", password):
        return False, "Mật khẩu phải có ít nhất 1 chữ hoa"

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"

    return True, "Dữ liệu hợp lệ"


def register_user(data):
    is_valid, message = validate_register_data(data)
    random_avatar = f"avt{random.randint(1, 21)}.jpg"
    if not is_valid:
        return False, message

    user = User(
        avatar=random_avatar,
        full_name=data.get("full_name").strip(),
        username=data.get("username").strip(),
        email=data.get("email").strip(),
        password=generate_password_hash(data.get("password"))
    )

    base_repository.save(user)

    return True, "Tạo tài khoản thành công"


def login_user(data):
    account = data.get("account", "").strip()
    password = data.get("password", "")

    if not account or not password:
        return False, "Vui lòng nhập đầy đủ thông tin", None, None

    user = get_user_by_email_or_username(account)

    if user is None:
        return False, "Tài khoản hoặc mật khẩu không đúng", None, None

    if not check_password_hash(user.password, password):
        return False, "Tài khoản hoặc mật khẩu không đúng", None, None

    access_token = create_access_token(identity=str(user.id))

    user_info = {
        "id": user.id,
        "full_name": user.full_name,
        "username": user.username,
        "email": user.email,
        "avatar": user.avatar,
        "is_verified": user.is_verified,
        "phone_number": user.phone_number,
        "date_of_birth": user.date_of_birth.isoformat() if user.date_of_birth else None,
        "academic_start_year": user.academic_start_year,
        "academic_end_year": user.academic_end_year,
        "is_graduated": user.is_graduated,
        "university_id": user.university_id,
        "gender": user.gender.name if user.gender else None,
        "faculty_id": user.faculty_id,
        "major_id": user.major_id,
        "university_code": user.university.code if user.university else None,
        "university_name": user.university.name if user.university else None,
        "faculty_name": user.faculty.name if user.faculty else None,
        "major_name": user.major.name if user.major else None,
    }

    return True, "Đăng nhập thành công", user_info, access_token


def update_profile(user_id, data):
    user = get_user_by_id(user_id)

    if user is None:
        return False, "Không tìm thấy người dùng"

    university_code = data.get("university_code", "").strip()
    faculty_name = data.get("faculty_name", "").strip()
    major_name = data.get("major_name", "").strip()

    university = University.query.filter_by(
        code=university_code
    ).first()

    if university is None:
        return False, "Không tìm thấy trường đại học"

    faculty = Faculty.query.filter_by(
        name=faculty_name,
        university_id=university.id
    ).first()

    if faculty is None:
        faculty = Faculty(
            name=faculty_name,
            university_id=university.id
        )
        db.session.add(faculty)
        db.session.flush()

    major = Major.query.filter_by(
        name=major_name,
        faculty_id=faculty.id
    ).first()

    if major is None:
        major = Major(
            name=major_name,
            faculty_id=faculty.id
        )
        db.session.add(major)
        db.session.flush()

    user.full_name = data.get("full_name")
    user.phone_number = data.get("phone_number")

    user.date_of_birth = datetime.strptime(
        data.get("date_of_birth"),
        "%Y-%m-%d"
    ).date()

    gender_value = data.get("gender")

    if gender_value:
        user.gender = GenderRole[gender_value]

    user.academic_start_year = int(
        data.get("academic_start_year")
    )

    user.academic_end_year = int(
        data.get("academic_end_year")
    )

    user.is_graduated = data.get(
        "is_graduated",
        False
    )

    user.university_id = university.id
    user.faculty_id = faculty.id
    user.major_id = major.id

    db.session.commit()

    return True, "Cập nhật thông tin thành công"
