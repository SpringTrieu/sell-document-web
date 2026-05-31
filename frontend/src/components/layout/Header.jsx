import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
    const { user, logout } = useAuth();
    const location = useLocation();

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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
          <ul className="navbar-nav gap-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Trang chủ
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/documents">
                Tài liệu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/forum">
                Trao đổi
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">
                Việc làm
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-none d-lg-flex align-items-center">
  {!user ? (
    <div className="d-flex align-items-center gap-2">
      <Link to="/login" className="btn btn-login">
        Đăng nhập
      </Link>

      <Link to="/register" className="btn btn-register">
        Đăng ký
      </Link>
    </div>
  ) : (
    <div className="user-dropdown">
      <div className="user-dropdown-trigger">
        {user.username}
      </div>

      <div className="user-dropdown-menu">
        <div className="user-dropdown-item">
          Tài Khoản Của Tôi
        </div>

        <div className="user-dropdown-item">
          Đơn Mua
        </div>

        <button
          className="user-dropdown-item logout-btn"
          onClick={logout}
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  )}
</div>
      </div>
    </nav>
  );
}

export default Header;
