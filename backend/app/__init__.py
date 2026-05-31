# app/__init__.py

from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.database import db, login
from flask import Flask
from flask_cors import CORS

from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] = "your-secret-key"
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_HTTPONLY"] = True
    app.config["JWT_COOKIE_SECURE"] = False
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    CORS(app, supports_credentials=True)
    db.init_app(app)
    JWTManager(app)
    login.init_app(app)

    from app.routes.main import main_bp
    from app.routes.auth import auth_bp
    #from app.routes.user import user_bp
    #from app.routes.admin import admin_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    #app.register_blueprint(user_bp)
    #app.register_blueprint(admin_bp)

    return app