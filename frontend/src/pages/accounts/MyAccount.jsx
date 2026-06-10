import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/pages/account/my-account.css";

const NAV_ITEMS = [
  {
    key: "profile",
    path: "/my-account",
    icon: "bi-person-circle",
    label: "Hồ sơ của tôi",
    description: "Quản lý thông tin cá nhân",
  },
  {
    key: "posts",
    path: "/my-account/posts",
    icon: "bi-file-earmark-text",
    label: "Bài đăng của tôi",
    description: "Quản lý bài đăng đã tạo",
  },
  {
    key: "saved",
    path: "/my-account/saved",
    icon: "bi-bookmark",
    label: "Bài viết đã lưu",
    description: "Những bài viết đã lưu",
  },
  {
    key: "orders",
    path: "/my-account/orders",
    icon: "bi-bag",
    label: "Đơn hàng của tôi",
    description: "Quản lý đơn hàng",
  },
  {
    key: "wallet",
    path: "/my-account/wallet",
    icon: "bi-wallet2",
    label: "Ví của tôi",
    description: "Số dư và lịch sử giao dịch",
  },
  {
    key: "bank",
    path: "/my-account/bank",
    icon: "bi-bank",
    label: "Tài khoản ngân hàng",
    description: "Quản lý tài khoản ngân hàng",
  },
  {
    key: "security",
    path: "/my-account/security",
    icon: "bi-shield-lock",
    label: "Bảo mật",
    description: "Đổi mật khẩu, bảo mật 2 lớp",
  },
  {
    key: "notifications",
    path: "/my-account/notifications",
    icon: "bi-bell",
    label: "Thông báo",
    description: "Cài đặt thông báo",
  },
  {
    key: "settings",
    path: "/my-account/settings",
    icon: "bi-gear",
    label: "Cài đặt tài khoản",
    description: "Ngôn ngữ, giao diện,...",
  },
];

const PROFILE_BENEFITS = [
  "Tăng độ tin cậy với người dùng khác",
  "Được phép đăng bài và tạo job",
  "Nhận được nhiều cơ hội hơn",
  "Hỗ trợ xác minh tài khoản nhanh hơn",
];

function getRoleLabel(role) {
  const roleMap = {
    student: "Sinh viên",
    user: "Sinh viên",
    partner: "Đối tác",
    admin: "Quản trị viên",
  };
  return roleMap[role?.toLowerCase?.()] || "Sinh viên";
}

function MyAccount() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const avatarSrc = user?.avatar ?? "https://i.pravatar.cc/100";
  const displayName = user?.full_name || user?.fullName || user?.username || "Người dùng";
  const username = user?.username || "";
  const email = user?.email || "";
  const isEmailVerified = Boolean(user?.emailVerified ?? user?.is_verified);

  const isNavActive = (path) => {
    if (path === "/my-account") {
      return location.pathname === "/my-account";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <main className="my-account-page">
      <div className="my-account-layout">
        {/* ── Sidebar ── */}
        <aside className="my-account-sidebar">
          <div className="sidebar-user">
            <img
              className="sidebar-user__avatar"
              src={avatarSrc}
              alt={displayName}
            />
            <div className="sidebar-user__info">
              <p className="sidebar-user__name">{displayName}</p>
              <p className="sidebar-user__username">@{username || "username"}</p>
              <span className="sidebar-user__badge">
                {getRoleLabel(user?.role)}
              </span>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Menu tài khoản">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`sidebar-nav__item${
                  isNavActive(item.path) ? " sidebar-nav__item--active" : ""
                }`}
              >
                <i className={`bi ${item.icon} sidebar-nav__icon`} aria-hidden="true" />
                <span className="sidebar-nav__text">
                  <span className="sidebar-nav__label">{item.label}</span>
                  <span className="sidebar-nav__desc">{item.description}</span>
                </span>
              </Link>
            ))}

            <button
              type="button"
              className="sidebar-nav__item sidebar-nav__item--logout"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Đăng xuất</span>
              </span>
            </button>
          </nav>

          <div className="sidebar-progress">
            <div className="sidebar-progress__header">
              <span className="sidebar-progress__label">Hoàn thiện hồ sơ</span>
              <span className="sidebar-progress__percent">0%</span>
            </div>
            <progress
              className="sidebar-progress__bar"
              value={0}
              max={100}
              aria-label="Tiến độ hoàn thiện hồ sơ"
            />
            <p className="sidebar-progress__hint">
              Vui lòng hoàn thiện thông tin để có thể đăng bài
            </p>
            <button type="button" className="sidebar-progress__btn">
              Hoàn thiện ngay →
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <section className="my-account-main">
          <header className="my-account-header">
            <h1 className="my-account-header__title">Hồ sơ của tôi</h1>
            <p className="my-account-header__subtitle">
              Cập nhật thông tin cá nhân để tăng độ tin cậy và sử dụng đầy đủ các tính năng
            </p>
          </header>

          <div className="my-account-form">
            {/* ── Thông tin cá nhân ── */}
            <div className="my-account-card">
              <h2 className="my-account-card__title">Thông tin cá nhân</h2>

              <div className="profile-section">
                {/* Avatar */}
                <div className="profile-avatar">
                  <div className="profile-avatar__preview">
                    <img src={avatarSrc} alt="Ảnh đại diện" />
                    <button
                      type="button"
                      className="profile-avatar__camera"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Đổi ảnh đại diện"
                    >
                      <i className="bi bi-camera-fill" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="profile-avatar__hint">JPG, PNG tối đa 2MB</p>
                  <button
                    type="button"
                    className="btn btn-outline profile-avatar__change"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Đổi ảnh
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="profile-avatar__input"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>

                {/* Fields */}
                <div className="profile-fields">
                  <div className="form-row form-row--2">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="username">
                        Tên đăng nhập
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-field__input field--disabled"
                        defaultValue={username}
                        readOnly
                      />
                      <span className="form-field__helper">
                        Tên đăng nhập không thể thay đổi
                      </span>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="email">
                        Email
                      </label>
                      <div className="form-field__email-wrap">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-field__input field--disabled"
                          defaultValue={email}
                          readOnly
                        />
                        {isEmailVerified && (
                          <span className="badge badge--verified">Đã xác thực</span>
                        )}
                      </div>
                      <span className="form-field__helper">
                        Email không thể thay đổi
                      </span>
                    </div>
                  </div>

                  <div className="form-row form-row--1">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="fullName">
                        Họ và tên
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="form-field__input"
                        defaultValue={user?.full_name || user?.fullName || ""}
                      />
                    </div>
                  </div>

                  <div className="form-row form-row--2">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="dateOfBirth">
                        Ngày sinh
                      </label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        className="form-field__input"
                        defaultValue={user?.date_of_birth || user?.dateOfBirth || ""}
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="gender">
                        Giới tính
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-field__input"
                        defaultValue={user?.gender || ""}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row form-row--3">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="startYear">
                        Năm bắt đầu học
                      </label>
                      {/* TODO: backend cung cấp danh sách năm */}
                      <select
                        id="startYear"
                        name="startYear"
                        className="form-field__input"
                        defaultValue={user?.academic_start_year || ""}
                      >
                        <option value="">Chọn năm</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="endYear">
                        Năm kết thúc học (dự kiến)
                      </label>
                      {/* TODO: backend cung cấp danh sách năm */}
                      <select
                        id="endYear"
                        name="endYear"
                        className="form-field__input"
                        defaultValue={user?.academic_end_year || ""}
                      >
                        <option value="">Chọn năm</option>
                      </select>
                    </div>

                    <div className="form-field form-field--checkbox">
                      <span className="form-field__label">Đã tốt nghiệp</span>
                      <label className="checkbox-label" htmlFor="isGraduated">
                        <input
                          id="isGraduated"
                          name="isGraduated"
                          type="checkbox"
                          defaultChecked={Boolean(user?.is_graduated ?? user?.isGraduated)}
                        />
                        <span>Tôi đã tốt nghiệp</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row form-row--3">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="university">
                        Trường
                      </label>
                      {/* TODO: backend cung cấp danh sách trường */}
                      <select
                        id="university"
                        name="university"
                        className="form-field__input"
                        defaultValue={user?.university_id || ""}
                      >
                        <option value="">Chọn trường</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="faculty">
                        Khoa
                      </label>
                      <input
                        id="faculty"
                        name="faculty"
                        type="text"
                        className="form-field__input"
                        defaultValue={user?.faculty || ""}
                        placeholder="Nhập tên khoa"
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="major">
                        Ngành
                      </label>
                      <input
                        id="major"
                        name="major"
                        type="text"
                        className="form-field__input"
                        defaultValue={user?.major || ""}
                        placeholder="Nhập tên ngành"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Thông tin tài khoản ── */}
            <div className="my-account-card">
              <h2 className="my-account-card__title">Thông tin tài khoản</h2>

              <div className="form-row form-row--2">
                <div className="form-field">
                  <label className="form-field__label" htmlFor="newPassword">
                    Mật khẩu mới (để trống nếu không đổi)
                  </label>
                  <div className="form-field__password">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="form-field__input"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-field__label" htmlFor="confirmPassword">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="form-field__password">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-field__input"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-account-actions">
              <button type="button" className="btn btn-primary">
                <i className="bi bi-floppy" aria-hidden="true" />
                Lưu thông tin
              </button>
              <button type="button" className="btn btn-secondary">
                Hủy
              </button>
            </div>
          </div>
        </section>

        {/* ── Right panel ── */}
        <aside className="my-account-panel">
          <div className="panel-card panel-card--benefits">
            <div className="panel-card__header">
              <i className="bi bi-shield-check panel-card__icon" aria-hidden="true" />
              <h3 className="panel-card__title">Tại sao cần hoàn thiện hồ sơ?</h3>
            </div>
            <ul className="panel-card__list">
              {PROFILE_BENEFITS.map((benefit) => (
                <li key={benefit} className="panel-card__list-item">
                  <i className="bi bi-check-circle-fill" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card panel-card--note">
            <div className="panel-card__header">
              <i className="bi bi-lightbulb panel-card__icon panel-card__icon--note" aria-hidden="true" />
              <h3 className="panel-card__title">Lưu ý</h3>
            </div>
            <p className="panel-card__note-text">
              Vui lòng điền đầy đủ và chính xác thông tin. Chúng tôi cam kết bảo mật
              tuyệt đối thông tin của bạn.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default MyAccount;
