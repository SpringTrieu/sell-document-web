# app/database.py
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()

login = LoginManager()
mail = Mail()
login.login_view = "auth.login"
