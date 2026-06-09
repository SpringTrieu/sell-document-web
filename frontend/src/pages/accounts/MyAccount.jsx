import { useEffect, useMemo, useRef, useState } from "react";
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

const UNIVERSITY_OPTIONS = [
  { value: "", label: "Chọn trường" },
  { value: "hust", label: "Đại học Bách Khoa Hà Nội" },
  { value: "hmu", label: "Đại học Y Hà Nội" },
  { value: "vnu", label: "Đại học Quốc gia Hà Nội" },
];

const FACULTY_OPTIONS = [
  { value: "", label: "Chọn khoa" },
  { value: "it", label: "Công nghệ thông tin" },
  { value: "business", label: "Kinh tế" },
  { value: "engineering", label: "Kỹ thuật" },
];

const MAJOR_OPTIONS = [
  { value: "", label: "Chọn ngành" },
  { value: "cs", label: "Khoa học máy tính" },
  { value: "se", label: "Kỹ thuật phần mềm" },
  { value: "is", label: "Hệ thống thông tin" },
];

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 10; year <= currentYear + 6; year += 1) {
    years.push(year);
  }
  return years;
}

function getRoleLabel(role) {
  const roleMap = {
    student: "Sinh viên",
    user: "Sinh viên",
    partner: "Đối tác",
    admin: "Quản trị viên",
  };
  return roleMap[role?.toLowerCase?.()] || "Sinh viên";
}

function calculateProfileCompletion(formData) {
  const fields = [
    "fullName",
    "dateOfBirth",
    "gender",
    "startYear",
    "endYear",
    "university",
    "faculty",
    "major",
  ];
  const filled = fields.filter((field) => Boolean(formData[field])).length;
  return Math.round((filled / fields.length) * 100);
}

function buildInitialFormData(user) {
  return {
    username: user?.username || "",
    email: user?.email || "",
    fullName: user?.full_name || user?.fullName || "",
    dateOfBirth: user?.date_of_birth || user?.dateOfBirth || "",
    gender: user?.gender || "",
    startYear: user?.academic_start_year?.toString() || user?.startYear || "",
    endYear: user?.academic_end_year?.toString() || user?.endYear || "",
    isGraduated: Boolean(user?.is_graduated ?? user?.isGraduated),
    university: user?.university_id?.toString() || user?.university || "",
    faculty: user?.faculty_id?.toString() || user?.faculty || "",
    major: user?.major_id?.toString() || user?.major || "",
    newPassword: "",
    confirmPassword: "",
  };
}

function MyAccount() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const yearOptions = useMemo(() => generateYearOptions(), []);

  const [formEdits, setFormEdits] = useState({});
  const [avatarOverride, setAvatarOverride] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formData = useMemo(
    () => ({ ...buildInitialFormData(user), ...formEdits }),
    [user, formEdits]
  );

  const avatarPreview =
    avatarOverride ?? user?.avatar ?? "https://i.pravatar.cc/100";

  const profileCompletion = calculateProfileCompletion(formData);
  const isEmailVerified = Boolean(user?.emailVerified ?? user?.is_verified);
  const displayName = formData.fullName || user?.full_name || user?.username || "Người dùng";

  useEffect(() => {
    return () => {
      if (avatarOverride?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarOverride);
      }
    };
  }, [avatarOverride]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormEdits((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarOverride((prev) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return previewUrl;
    });
  };

  const handleReset = () => {
    setFormEdits({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAvatarOverride((prev) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile data:", { ...formData, avatarPreview });
  };

  const isNavActive = (path) => {
    if (path === "/my-account") {
      return location.pathname === "/my-account";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <main className="my-account-page">
      <div className="my-account-layout">
        <aside className="my-account-sidebar">
          <div className="sidebar-user">
            <img
              className="sidebar-user__avatar"
              src={avatarPreview}
              alt={displayName}
            />
            <div className="sidebar-user__info">
              <p className="sidebar-user__name">{displayName}</p>
              <p className="sidebar-user__username">
                @{formData.username || "username"}
              </p>
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
              <span className="sidebar-progress__percent">{profileCompletion}%</span>
            </div>
            <progress
              className="sidebar-progress__bar"
              value={profileCompletion}
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

        <section className="my-account-main">
          <header className="my-account-header">
            <h1 className="my-account-header__title">Hồ sơ của tôi</h1>
            <p className="my-account-header__subtitle">
              Cập nhật thông tin cá nhân để tăng độ tin cậy và sử dụng đầy đủ các
              tính năng
            </p>
          </header>

          <form className="my-account-form" onSubmit={handleSubmit}>
            <div className="my-account-card">
              <h2 className="my-account-card__title">Thông tin cá nhân</h2>

              <div className="profile-section">
                <div className="profile-avatar">
                  <div className="profile-avatar__preview">
                    <img src={avatarPreview} alt="Ảnh đại diện" />
                    <button
                      type="button"
                      className="profile-avatar__camera"
                      onClick={handleAvatarClick}
                      aria-label="Đổi ảnh đại diện"
                    >
                      <i className="bi bi-camera-fill" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="profile-avatar__hint">JPG, PNG tối đa 2MB</p>
                  <button
                    type="button"
                    className="btn btn-outline profile-avatar__change"
                    onClick={handleAvatarClick}
                  >
                    Đổi ảnh
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="profile-avatar__input"
                    onChange={handleAvatarChange}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>

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
                        value={formData.username}
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
                          value={formData.email}
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
                        value={formData.fullName}
                        onChange={handleChange}
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
                        value={formData.dateOfBirth}
                        onChange={handleChange}
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
                        value={formData.gender}
                        onChange={handleChange}
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
                      <select
                        id="startYear"
                        name="startYear"
                        className="form-field__input"
                        value={formData.startYear}
                        onChange={handleChange}
                      >
                        <option value="">Chọn năm</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="endYear">
                        Năm kết thúc học (dự kiến)
                      </label>
                      <select
                        id="endYear"
                        name="endYear"
                        className="form-field__input"
                        value={formData.endYear}
                        onChange={handleChange}
                      >
                        <option value="">Chọn năm</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field form-field--checkbox">
                      <span className="form-field__label">Đã tốt nghiệp</span>
                      <label className="checkbox-label" htmlFor="isGraduated">
                        <input
                          id="isGraduated"
                          name="isGraduated"
                          type="checkbox"
                          checked={formData.isGraduated}
                          onChange={handleChange}
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
                      <select
                        id="university"
                        name="university"
                        className="form-field__input"
                        value={formData.university}
                        onChange={handleChange}
                      >
                        {UNIVERSITY_OPTIONS.map((option) => (
                          <option key={option.value || "empty"} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="faculty">
                        Khoa
                      </label>
                      <select
                        id="faculty"
                        name="faculty"
                        className="form-field__input"
                        value={formData.faculty}
                        onChange={handleChange}
                      >
                        {FACULTY_OPTIONS.map((option) => (
                          <option key={option.value || "empty-faculty"} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-field__label" htmlFor="major">
                        Ngành
                      </label>
                      <select
                        id="major"
                        name="major"
                        className="form-field__input"
                        value={formData.major}
                        onChange={handleChange}
                      >
                        {MAJOR_OPTIONS.map((option) => (
                          <option key={option.value || "empty-major"} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                      type={showPassword ? "text" : "password"}
                      className="form-field__input"
                      value={formData.newPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="form-field__toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      <i
                        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        aria-hidden="true"
                      />
                    </button>
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
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-field__input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="form-field__toggle"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      <i
                        className={`bi ${
                          showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-account-actions">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-floppy" aria-hidden="true" />
                Lưu thông tin
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Hủy
              </button>
            </div>
          </form>
        </section>

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
