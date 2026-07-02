from flask import Blueprint, jsonify, request
from app.services.mail_service import send_verification_email
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)
from app.services.email_verification_service import (
    create_email_verification_code,
    verify_email_code
)
from app.database import db
from app.repositories.user_repository import get_user_by_id
from app.services.auth_service import login_user, register_user, update_profile
from app.services.email_verification_service import create_email_verification_code

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if data is None:
        return jsonify({
            "success": False,
            "message": "Dữ liệu không hợp lệ"
        }), 400

    success, message = register_user(data)

    if not success:
        return jsonify({
            "success": False,
            "message": message
        }), 400

    return jsonify({
        "success": True,
        "message": message
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if data is None:
        return jsonify({
            "success": False,
            "message": "Dữ liệu không hợp lệ"
        }), 400

    success, message, user, access_token = login_user(data)

    if not success:
        return jsonify({
            "success": False,
            "message": message
        }), 400

    response = jsonify({
        "success": True,
        "message": message,
        "user": user
    })

    set_access_cookies(response, access_token)

    return response, 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "Không tìm thấy người dùng"
        }), 404

    return jsonify({
        "success": True,
        "user": {
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
            "faculty_id": user.faculty_id,
            "major_id": user.major_id,
            "gender": user.gender.name if user.gender else None,
            "university_code": user.university.code if user.university else None,
            "university_name": user.university.name if user.university else None,
            "faculty_name": user.faculty.name if user.faculty else None,
            "major_name": user.major.name if user.major else None,
        }
    }), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({
        "success": True,
        "message": "Đăng xuất thành công"
    })

    unset_jwt_cookies(response)

    return response, 200


@auth_bp.route("/avatar", methods=["PUT"])
@jwt_required()
def update_avatar():
    user_id = get_jwt_identity()

    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "Không tìm thấy người dùng"
        }), 404

    data = request.get_json()

    avatar = data.get("avatar")

    if not avatar:
        return jsonify({
            "success": False,
            "message": "Avatar không hợp lệ"
        }), 400

    user.avatar = avatar

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Cập nhật avatar thành công",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar,
            "is_verified": user.is_verified
        }
    }), 200


@auth_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity()
    data = request.get_json()

    success, message = update_profile(user_id, data)

    if not success:
        return jsonify({
            "success": False,
            "message": message
        }), 400

    user = get_user_by_id(user_id)

    return jsonify({
        "success": True,
        "message": message,
        "user": {
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
            "faculty_id": user.faculty_id,
            "major_id": user.major_id,
            "gender": user.gender.name if user.gender else None,
            "university_code": user.university.code if user.university else None,
            "university_name": user.university.name if user.university else None,
            "faculty_name": user.faculty.name if user.faculty else None,
            "major_name": user.major.name if user.major else None,
        }
    }), 200


@auth_bp.route("/send-verification-code", methods=["POST"])
@jwt_required()
def send_verification_code():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "Không tìm thấy người dùng"
        }), 404

    if user.is_verified:
        return jsonify({
            "success": False,
            "message": "Email đã được xác thực"
        }), 400

    code = create_email_verification_code(user)
    send_verification_email(user.email, code)

    return jsonify({
        "success": True,
        "message": "Đã gửi mã xác thực",
    }), 200


@auth_bp.route("/verify-email", methods=["POST"])
@jwt_required()
def verify_email():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "Không tìm thấy người dùng"
        }), 404

    data = request.get_json()
    code = data.get("code", "").strip()

    success, message = verify_email_code(user, code)

    if not success:
        return jsonify({
            "success": False,
            "message": message
        }), 400

    return jsonify({
        "success": True,
        "message": message,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar,
            "is_verified": user.is_verified
        }
    }), 200
