import AccountSidebarLayout from "../../components/layout/AccountSidebarLayout";
import AccountSidebarNav from "../../components/account/AccountSidebarNav";

function MyAccount() {
  return (
    <AccountSidebarLayout
      sidebar={<AccountSidebarNav activePath="/my-account" />}
    >
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
                <button type="button" className="profile-avatar__camera" aria-label="Đổi ảnh đại diện">
                  <i className="bi bi-camera-fill" aria-hidden="true" />
                </button>
              </div>
              <p className="profile-avatar__hint">JPG, PNG tối đa 2MB</p>
              <button type="button" className="btn btn-outline profile-avatar__change">
                Đổi ảnh
              </button>
              <input type="file" accept="image/jpeg,image/png" className="profile-avatar__input" tabIndex={-1} aria-hidden="true" />
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

              {/* Row 5: university + faculty + major */}
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

              {/* Nút Lưu thông tin */}
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
    </AccountSidebarLayout>
  );
}

export default MyAccount;