import re

from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from app.models.user import User
from app.repositories import base_repository
from app.repositories.user_repository import is_username_exists, is_email_exists, get_user_by_email_or_username


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

    if not is_valid:
        return False, message

    user = User(
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
        "email": user.email
    }

    return True, "Đăng nhập thành công", user_info, access_token