from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)

from app.services.auth_service import register_user, login_user
from app.repositories.user_repository import get_user_by_id

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


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
            "email": user.email
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