from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models.university import University

university_bp = Blueprint(
    "university",
    __name__,
    url_prefix="/api/universities"
)


@university_bp.route("/", methods=["GET"])
@jwt_required()
def get_universities():
    universities = University.query.order_by(
        University.name.asc()
    ).all()

    return jsonify({
        "success": True,
        "universities": [
            {
                "id": item.id,
                "name": item.name,
                "code": item.code
            }
            for item in universities
        ]
    }), 200
