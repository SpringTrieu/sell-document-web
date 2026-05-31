# app/config.py

class Config:
    SECRET_KEY = "KJASKJHDAKJHDIS"

    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:Root%40123A@localhost/sell_document_db?charset=utf8mb4"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    PAGE_SIZE = 15