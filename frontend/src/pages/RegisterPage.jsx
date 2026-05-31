import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppModal from "../components/common/AppModal";

function RegisterPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      full_name: formData.get("full_name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("");
        e.target.reset();
        setShowSuccessModal(true);
        return;
      }

      setMessage(result.message);
    } catch (error) {
      setMessage("Không thể kết nối đến server");
    }
  };

  return (
    <>
      <section className="login-page register-page">
        <div className="container">
          <div className="login-layout">
            <div className="login-hero">
              <h1>
                Tham gia Học Tốt
                <br />
                bắt đầu học tốt hơn
              </h1>

              <p>
                Tạo tài khoản để lưu tài liệu, đăng tài liệu, trao đổi và kết
                nối với cộng đồng sinh viên.
              </p>
            </div>

            <div className="login-form-wrapper">
              <div className="login-form-box">
                <h2>Đăng ký</h2>

                <p className="login-subtitle">
                  Tạo tài khoản Học Tốt của bạn
                </p>

                {message && (
                  <p className="form-message error">
                    {message}
                  </p>
                )}

                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      name="username"
                      type="text"
                      placeholder="Nhập username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Nhập email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </div>

                  <button type="submit" className="login-btn">
                    Tạo tài khoản
                  </button>
                </form>

                <p className="register-text">
                  Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppModal
        show={showSuccessModal}
        title="Tạo tài khoản thành công"
        message="Tài khoản của bạn đã được tạo. Vui lòng đăng nhập để tiếp tục sử dụng hệ thống."
        buttonText="Đăng nhập"
        onConfirm={() => navigate("/login")}
      />
    </>
  );
}

export default RegisterPage;