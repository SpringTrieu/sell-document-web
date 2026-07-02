# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = "KJASKJHDAKJHDIS"
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_USERNAME")
    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:Root%40123A@localhost/sell_document_db?charset=utf8mb4"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    PAGE_SIZE = 15
