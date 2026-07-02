import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import avatarList from "../avatar/avatarList";
function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
    const avatarSrc = avatarList.find((avatar) => avatar.includes(user?.avatar)) || avatarList[0];
  const isAccountPage = location.pathname.startsWith("/my-account");

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
    <form className="d-flex flex-grow-1 mx-4" role="search">
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          <i className="bi bi-search"></i>
        </span>

        <input
          className="form-control bg-light border-start-0"
          type="search"
          placeholder="Tìm kiếm tài liệu, bài viết, việc làm..."
        />
      </div>
    </form>

    <div className="d-flex align-items-center gap-3">
      <button className="btn position-relative p-0 border-0 bg-transparent">
        <i className="bi bi-bell fs-5"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          3
        </span>
      </button>

      <button className="btn p-0 border-0 bg-transparent">
        <i className="bi bi-chat-left-text fs-5"></i>
      </button>

      <div className="dropdown">
        <button
          className="btn d-flex align-items-center gap-2 dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={avatarSrc}
            alt="avatar"
            className="rounded-circle"
            width="42"
            height="42"
          />

          <div className="text-start">
            <strong className="d-block small">
  {user?.username || "Người dùng"}
</strong>
            <span className="text-muted small">Xem trang cá nhân</span>
          </div>
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link className="dropdown-item" to="/my-account">
              Tài Khoản Của Tôi
            </Link>
          </li>

          <li>
            <button className="dropdown-item" type="button">
              Đơn Mua
            </button>
          </li>

          <li>
            <button className="dropdown-item text-danger" onClick={logout}>
              Đăng Xuất
            </button>
          </li>
        </ul>
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