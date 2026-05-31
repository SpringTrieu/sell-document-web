import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      account: formData.get("account"),
      password: formData.get("password"),
    };

    try {
      const result = await login(data);

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setUser(result.user);
      setMessage("");
      navigate("/");
    } catch (error) {
      setMessage("Không thể kết nối đến server");
    }
  };


  return (
    <section className="login-page">
      <div className="container">
        <div className="login-layout">
          <div className="login-hero">
            <h1>
              Học tốt hơn
              <br />
              cùng cộng đồng sinh viên
            </h1>

            <p>
              Lưu tài liệu, tải tài liệu, trao đổi, tìm việc và kết nối học tập dễ dàng.
            </p>
          </div>

          <div className="login-form-wrapper">
            <div className="login-form-box">
              <h2>Đăng nhập</h2>

              <p className="login-subtitle">Tiếp tục với tài khoản Học Tốt</p>

              {message && <p className="form-message error">{message}</p>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email hoặc tên đăng nhập</label>

                  <input
                    name="account"
                    type="text"
                    placeholder="Nhập email hoặc tên đăng nhập"
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

                <div className="login-options">
                  <label>
                    <input type="checkbox" /> Ghi nhớ tôi
                  </label>

                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>

                <button type="submit" className="login-btn">
                  Đăng nhập
                </button>
              </form>

              <p className="register-text">
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;