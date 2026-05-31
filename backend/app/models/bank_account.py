from app.database import db
from app.models.base import BaseModel


class BankAccount(BaseModel):
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        unique=True,
        nullable=False,
        comment="Mã người dùng sở hữu tài khoản ngân hàng"
    )

    bank_name = db.Column(
        db.String(100),
        nullable=False,
        comment="Tên ngân hàng"
    )

    account_number = db.Column(
        db.String(50),
        nullable=False,
        comment="Số tài khoản"
    )

    account_holder = db.Column(
        db.String(100),
        nullable=False,
        comment="Tên chủ tài khoản"
    )

    user = db.relationship(
        "User",
        back_populates="bank_account"
    )

    def __repr__(self):
        return f"<BankAccount {self.bank_name} - {self.account_number}>"