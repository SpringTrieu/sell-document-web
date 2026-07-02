import json
from app import create_app
from app.database import db
from app.models.university import University, SchoolType

app = create_app()

with app.app_context():
    with open("app/static/universities.json", "r", encoding="utf-8") as f:
        universities = json.load(f)

    for item in universities:
        code = item.get("code")
        name = item.get("name")

        if not code or not name:
            continue

        existing = University.query.filter_by(code=code).first()

        if existing:
            continue

        university = University(
            name=name,
            code=code,
            province=None,
            type=SchoolType.Public
        )

        db.session.add(university)

    db.session.commit()

    print("Seed universities completed.")
