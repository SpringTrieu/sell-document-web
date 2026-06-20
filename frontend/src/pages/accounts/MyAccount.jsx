import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/pages/account/my-account.css";

function MyAccount() {
  const { logout } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const isNavActive = (path) =>
    path === "/my-account"
      ? location.pathname === "/my-account"
      : location.pathname.startsWith(path);

  return (
    <main className="my-account-page">
      <div className="my-account-layout">

        {/* ── Sidebar (Đã gộp liền mạch thành 1 khối) ── */}
        <aside className="my-account-sidebar">
          <div className="sidebar-user">
            <img className="sidebar-user__avatar" src="https://i.pravatar.cc/100" alt="Người dùng" />
            <div className="sidebar-user__info">
              <p className="sidebar-user__name">Người dùng</p>
              <p className="sidebar-user__username">@username</p>
              <span className="sidebar-user__badge">Sinh viên</span>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Menu tài khoản">
            <Link
              to="/my-account"
              className={`sidebar-nav__item${isNavActive("/my-account") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-person-circle sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Hồ sơ của tôi</span>
                <span className="sidebar-nav__desc">Quản lý thông tin cá nhân</span>
              </span>
            </Link>

            <Link
              to="/my-account/posts"
              className={`sidebar-nav__item${isNavActive("/my-account/posts") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-file-earmark-text sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Bài đăng của tôi</span>
                <span className="sidebar-nav__desc">Quản lý bài đăng đã tạo</span>
              </span>
            </Link>

            <Link
              to="/my-account/saved"
              className={`sidebar-nav__item${isNavActive("/my-account/saved") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-bookmark sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Bài viết đã lưu</span>
                <span className="sidebar-nav__desc">Những bài viết đã lưu</span>
              </span>
            </Link>

            <Link
              to="/my-account/orders"
              className={`sidebar-nav__item${isNavActive("/my-account/orders") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-bag sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Đơn hàng của tôi</span>
                <span className="sidebar-nav__desc">Quản lý đơn hàng</span>
              </span>
            </Link>

            <Link
              to="/my-account/wallet"
              className={`sidebar-nav__item${isNavActive("/my-account/wallet") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-wallet2 sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Ví của tôi</span>
                <span className="sidebar-nav__desc">Số dư và lịch sử giao dịch</span>
              </span>
            </Link>

            <Link
              to="/my-account/bank"
              className={`sidebar-nav__item${isNavActive("/my-account/bank") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-bank sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Tài khoản ngân hàng</span>
                <span className="sidebar-nav__desc">Quản lý tài khoản ngân hàng</span>
              </span>
            </Link>

            <Link
              to="/my-account/security"
              className={`sidebar-nav__item${isNavActive("/my-account/security") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-shield-lock sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Bảo mật</span>
                <span className="sidebar-nav__desc">Đổi mật khẩu, bảo mật 2 lớp</span>
              </span>
            </Link>

            <Link
              to="/my-account/notifications"
              className={`sidebar-nav__item${isNavActive("/my-account/notifications") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-bell sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Thông báo</span>
                <span className="sidebar-nav__desc">Cài đặt thông báo</span>
              </span>
            </Link>

            <Link
              to="/my-account/settings"
              className={`sidebar-nav__item${isNavActive("/my-account/settings") ? " sidebar-nav__item--active" : ""}`}
            >
              <i className="bi bi-gear sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Cài đặt tài khoản</span>
                <span className="sidebar-nav__desc">Ngôn ngữ, giao diện,...</span>
              </span>
            </Link>

            <button type="button" className="sidebar-nav__item sidebar-nav__item--logout" onClick={logout}>
              <i className="bi bi-box-arrow-right sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Đăng xuất</span>
              </span>
            </button>
          </nav>
        </aside>

        {/* ── Main content (Form tràn rộng 100% - Đã xóa cột phải và block Mật khẩu) ── */}
        <section className="my-account-main">
          <header className="my-account-header">
            <h1 className="my-account-header__title">Hồ sơ của tôi</h1>
            <p className="my-account-header__subtitle">
              Cập nhật thông tin cá nhân để tăng độ tin cậy và sử dụng đầy đủ các tính năng
            </p>
          </header>

          <form className="my-account-form">
            <div className="my-account-card">
              <h2 className="my-account-card__title">Thông tin cá nhân</h2>

              <div className="profile-section">
                {/* Avatar */}
                <div className="profile-avatar">
                  <div className="profile-avatar__preview">
                    <img src="https://i.pravatar.cc/100" alt="Ảnh đại diện" />
                    <button type="button" className="profile-avatar__camera" onClick={() => fileInputRef.current?.click()} aria-label="Đổi ảnh đại diện">
                      <i className="bi bi-camera-fill" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="profile-avatar__hint">JPG, PNG tối đa 2MB</p>
                  <button type="button" className="btn btn-outline profile-avatar__change" onClick={() => fileInputRef.current?.click()}>
                    Đổi ảnh
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="profile-avatar__input" tabIndex={-1} aria-hidden="true" />
                </div>

                {/* Fields */}
                <div className="profile-fields">
                  {/* Row 1: username + email */}
                  <div className="form-row form-row--2">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="username">Tên đăng nhập</label>
                      <input id="username" name="username" type="text" className="form-field__input field--disabled" placeholder="username" readOnly />
                      <span className="form-field__helper">Tên đăng nhập không thể thay đổi</span>
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" className="form-field__input field--disabled" placeholder="example@email.com" readOnly />
                      <span className="form-field__helper">Email không thể thay đổi</span>
                    </div>
                  </div>

                  {/* Row 2: fullName */}
                  <div className="form-row form-row--1">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="fullName">Họ và tên</label>
                      <input id="fullName" name="fullName" type="text" className="form-field__input" />
                    </div>
                  </div>

                  {/* Row 3: dateOfBirth + gender */}
                  <div className="form-row form-row--2">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="dateOfBirth">Ngày sinh</label>
                      <input id="dateOfBirth" name="dateOfBirth" type="date" className="form-field__input" />
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="gender">Giới tính</label>
                      <select id="gender" name="gender" className="form-field__input">
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: startYear + endYear + isGraduated */}
                  <div className="form-row form-row--year-grad">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="startYear">Năm bắt đầu học</label>
                      <input id="startYear" name="startYear" type="number" className="form-field__input" placeholder="VD: 2021" />
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="endYear">Năm kết thúc (dự kiến)</label>
                      <input id="endYear" name="endYear" type="number" className="form-field__input" placeholder="VD: 2025" />
                    </div>
                    <div className="form-field form-field--checkbox">
                      <span className="form-field__label">Đã tốt nghiệp</span>
                      <label className="checkbox-label" htmlFor="isGraduated">
                        <input id="isGraduated" name="isGraduated" type="checkbox" />
                        <span>Tôi đã tốt nghiệp</span>
                      </label>
                    </div>
                  </div>

                  {/* Row 5: university + faculty + major (Tất cả đều chuyển thành input text) */}
                  <div className="form-row form-row--3">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="university">Trường</label>
                      <input id="university" name="university" type="text" className="form-field__input" placeholder="Tên trường đại học" />
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="faculty">Khoa</label>
                      <input id="faculty" name="faculty" type="text" className="form-field__input" placeholder="Chọn khoa" />
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="major">Ngành</label>
                      <input id="major" name="major" type="text" className="form-field__input" placeholder="Chọn ngành" />
                    </div>
                  </div>

                  {/* Cụm nút Lưu thông tin nằm gọn bên trong Ô Thông tin cá nhân */}
                  <div className="my-account-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-floppy" aria-hidden="true" />
                      Lưu thông tin
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Hủy
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}

export default MyAccount; 