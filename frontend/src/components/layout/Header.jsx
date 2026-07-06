import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Simple header for login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    const pageTitle = location.pathname === "/login" ? "Đăng nhập" : "Đăng ký";
    return (
      <header className="simple-header">
        <div className="simple-header-container">
          <Link className="navbar-logo" to="/">
            ✦ Học Tốt
          </Link>
          <span className="simple-header-title">{pageTitle}</span>
        </div>
      </header>
    );
  }

  // Account page has different header (with search and notifications)
  if (location.pathname.startsWith("/my-account") || location.pathname.startsWith("/forum")) {
    return (
      <header className="account-header">
        <div className="account-header-container">
          {/* Cụm TRÁI: Logo thẳng hàng với mép trái Sidebar */}
          <div className="account-header-logo">
            <Link className="navbar-logo" to="/">
              ✦ Học Tốt
            </Link>
          </div>

          {/* Cụm GIỮA: Search bar thu ngắn, căn giữa Header */}
          <div className="account-header-center">
            <div className="account-search-bar">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, bài viết, việc làm..."
                aria-label="Tìm kiếm"
              />
            </div>
          </div>

          {/* Cụm PHẢI: Icons sát mép phải */}
          <div className="account-actions">
            <button className="icon-btn" aria-label="Thông báo">
              <i className="bi bi-bell"></i>
              <span className="badge-notification">3</span>
            </button>
            <button className="icon-btn" aria-label="Tin nhắn">
              <i className="bi bi-chat-left-text"></i>
            </button>
            {user && (
              <div className="user-menu">
                <button className="user-menu-trigger" aria-label="Menu người dùng">
                  <img src="https://i.pravatar.cc/100" alt={user?.username} />
                  <div className="user-info">
                    <strong>{user.username || "Nguyễn Văn A"}</strong>
                    <span>Xem trang cá nhân</span>
                  </div>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <div className="user-menu-dropdown">
                  <Link to="/my-account" className="menu-item">
                    Tài Khoản Của Tôi
                  </Link>
                  <button className="menu-item">Đơn Mua</button>
                  <button className="menu-item logout-item" onClick={logout}>
                    Đăng Xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Main floating navbar for home page
  return (
    <header className="floating-navbar">
      <div className="floating-navbar-wrapper">
        <div className="floating-navbar-container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link className="navbar-logo" to="/">
            ✦ Học Tốt
          </Link>

          {/* Menu */}
          <nav className="navbar-menu d-flex align-items-center gap-4">
            <NavLink className="nav-link" to="/">
              Trang chủ
            </NavLink>
            <NavLink className="nav-link" to="/documents">
              Tài liệu
            </NavLink>
            <NavLink className="nav-link" to="/forum">
              Trao đổi
            </NavLink>
            <NavLink className="nav-link" to="/jobs">
              Việc làm
            </NavLink>
            <NavLink className="nav-link" to="/contact">
              Liên hệ
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="navbar-actions d-flex align-items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="btn-login">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-register">
                  Đăng ký
                </Link>
              </>
            ) : (
              <div className="user-menu">
                <button className="user-menu-trigger" aria-label="Menu người dùng">
                  {user.username}
                </button>
                <div className="user-menu-dropdown">
                  <Link to="/my-account" className="menu-item">
                    Tài Khoản Của Tôi
                  </Link>
                  <button className="menu-item">Đơn Mua</button>
                  <button className="menu-item logout-item" onClick={logout}>
                    Đăng Xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;