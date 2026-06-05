import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAccountPage = location.pathname === "/my-account";

  if (location.pathname === "/login") {
    return (
      <nav className="simple-navbar">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold" to="/">
            ✦ Học Tốt
          </Link>
          <span className="simple-navbar-title">Đăng nhập</span>
        </div>
      </nav>
    );
  }

  if (location.pathname === "/register") {
    return (
      <nav className="simple-navbar">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold" to="/">
            ✦ Học Tốt
          </Link>
          <span className="simple-navbar-title">Đăng ký</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          ✦ Học Tốt
        </Link>

        {isAccountPage ? (
          <>
            <div className="account-header-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, bài viết, việc làm..."
              />
            </div>

            <div className="account-header-actions">
              <button className="header-icon-btn">
                <i className="bi bi-bell"></i>
                <span className="notification-badge">3</span>
              </button>

              <button className="header-icon-btn">
                <i className="bi bi-chat-left-text"></i>
              </button>

              <div className="user-dropdown">
  <div className="account-user-mini">
    <img src="https://i.pravatar.cc/100" alt="avatar" />

    <div>
      <strong>{user?.username || "Nguyễn Văn A"}</strong>
      <p>Xem trang cá nhân</p>
    </div>

    <i className="bi bi-chevron-down"></i>
  </div>

  <div className="user-dropdown-menu">
    <Link to="/my-account" className="user-dropdown-item">
      Tài Khoản Của Tôi
    </Link>

    <div className="user-dropdown-item">Đơn Mua</div>

    <button className="user-dropdown-item logout-btn" onClick={logout}>
      Đăng Xuất
    </button>
  </div>
</div>
            </div>
          </>
        ) : (
          <>
            <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
              <ul className="navbar-nav gap-lg-4">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/documents">Tài liệu</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/forum">Trao đổi</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobs">Việc làm</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Liên hệ</NavLink>
                </li>
              </ul>
            </div>

            <div className="d-none d-lg-flex align-items-center">
              {!user ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/login" className="btn btn-login">Đăng nhập</Link>
                  <Link to="/register" className="btn btn-register">Đăng ký</Link>
                </div>
              ) : (
                <div className="user-dropdown">
                  <div className="user-dropdown-trigger">{user.username}</div>

                  <div className="user-dropdown-menu">
                    <Link to="/my-account" className="user-dropdown-item">
                      Tài Khoản Của Tôi
                    </Link>

                    <div className="user-dropdown-item">Đơn Mua</div>

                    <button className="user-dropdown-item logout-btn" onClick={logout}>
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;