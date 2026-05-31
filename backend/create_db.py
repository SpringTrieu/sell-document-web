from app import create_app
from app.database import db
import app.models   # bắt buộc để load tất cả model

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Tạo database thành công!")