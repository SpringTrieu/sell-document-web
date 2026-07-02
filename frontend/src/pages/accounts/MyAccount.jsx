import { useState, useEffect } from "react";
import "../../styles/pages/account/my-account.css";
import { useAuth } from "../../contexts/AuthContext";
import avatarList from "../../components/avatar/avatarList";
import AppModal from "../../components/common/AppModal";
import { getUniversities } from "../../services/universityService";
import { updateProfile } from "../../services/authService";
function MyAccount() {
    const { user, setUser, logout } = useAuth();
    const currentAvatar = avatarList.find((avatar) => avatar.includes(user?.avatar)) || avatarList[0];
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
    const [selectedAvatarName, setSelectedAvatarName] = useState(user?.avatar);
    const [universitySearch, setUniversitySearch] = useState("");
    const [universities, setUniversities] = useState([]);
    const [showUniversityOptions, setShowUniversityOptions] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const buildProfileFormFromUser = (user) => ({
  full_name: user?.full_name || "",
  phone_number: user?.phone_number || "",
  date_of_birth: user?.date_of_birth || "",
  gender: user?.gender || "",
  academic_start_year: user?.academic_start_year || "",
  academic_end_year: user?.academic_end_year || "",
  is_graduated: user?.is_graduated || false,
  university: user?.university_code || "",
  faculty: user?.faculty_name || "",
  major: user?.major_name || "",
});
    const [appModal, setAppModal] = useState({
  show: false,
  type: "",
  title: "",
  message: "",
  buttonText: "Đồng ý",
});

const [focusFieldName, setFocusFieldName] = useState("");
const [invalidFields, setInvalidFields] = useState([]);
    const initialProfileForm = buildProfileFormFromUser(user);


const [savedProfileForm, setSavedProfileForm] = useState(initialProfileForm);
    const [profileForm, setProfileForm] = useState(initialProfileForm);
    const handleSaveAvatar = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/avatar", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: selectedAvatarName,
      }),
    });

    const result = await response.json();

    console.log("UPDATE AVATAR:", result);

    if (!response.ok || !result.success) {
      alert(result.message || "Cập nhật avatar thất bại");
      return;
    }

    if (response.status === 401) {
  alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
  logout();
  return;
}

    setUser(result.user);
    setShowAvatarModal(false);
  } catch (error) {
    console.error(error);
    alert("Không thể kết nối server");
  }
};
const handleProfileChange = (e) => {
  const { name, value, type, checked } = e.target;

  setInvalidFields((prev) =>
  prev.filter((field) => field !== name)
);

  setProfileForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const closeAppModal = () => {
  const currentType = appModal.type;

  setAppModal((prev) => ({
    ...prev,
    show: false,
  }));

  if (currentType === "empty-profile") {
    return;
  }

  if (focusFieldName) {
    setTimeout(() => {
      const element = document.querySelector(`[name="${focusFieldName}"]`);
      element?.focus();
      setFocusFieldName("");
    }, 100);
  }
};
const handleModalConfirm = () => {
  setAppModal((prev) => ({
    ...prev,
    show: false,
  }));

  if (appModal.type === "empty-profile") {
    setTimeout(() => {
      document.querySelector(`[name="date_of_birth"]`)?.focus();
    }, 100);
    return;
  }
  if (appModal.type === "cancel-profile") {
    setProfileForm(savedProfileForm);
    setInvalidFields([]);
    setFocusFieldName("");
    setUniversitySearch("");
    setShowUniversityOptions(false);
    return;
  }

};
const handleSaveProfile = async (e) => {
  e.preventDefault();

  const requiredFields = [
    "full_name",
    "phone_number",
    "date_of_birth",
    "gender",
    "academic_start_year",
    "academic_end_year",
    "university",
    "faculty",
    "major",
  ];


  const emptyFields = requiredFields.filter((field) => !profileForm[field]);

if (emptyFields.length > 0) {
  setInvalidFields(emptyFields);
  setFocusFieldName(emptyFields[0]);

  setAppModal({
    show: true,
    type: "missing-profile",
    title: "Thiếu thông tin",
    message: "Bạn cần điền đầy đủ các thông tin bắt buộc trước khi lưu.",
    buttonText: "Tôi đã hiểu",
    cancelText: "",
    icon: "",
    iconType: "",
  });

  return;
}

setInvalidFields([]);



  console.log("PROFILE FORM:", profileForm);
  try {
      console.log({
  full_name: profileForm.full_name,
  phone_number: profileForm.phone_number,
  date_of_birth: profileForm.date_of_birth,
  academic_start_year: profileForm.academic_start_year,
  academic_end_year: profileForm.academic_end_year,
  is_graduated: profileForm.is_graduated,
  university_code: profileForm.university,
  faculty_name: profileForm.faculty,
  major_name: profileForm.major,
  gender: profileForm.gender,
});
  const result = await updateProfile({
    full_name: profileForm.full_name,
    phone_number: profileForm.phone_number,
    date_of_birth: profileForm.date_of_birth,
    academic_start_year: profileForm.academic_start_year,
    academic_end_year: profileForm.academic_end_year,
    is_graduated: profileForm.is_graduated,
    university_code: profileForm.university,
    faculty_name: profileForm.faculty,
    major_name: profileForm.major,
    gender: profileForm.gender,
  });

  if (!result.success) {
    setAppModal({
      show: true,
      type: "save-error",
      title: "Lưu thất bại",
      message: result.message || "Không thể cập nhật thông tin.",
      buttonText: "Đồng ý",
      cancelText: "",
      icon: "",
      iconType: "",
    });

    return;
  }

  setUser(result.user);

  setInvalidFields([]);

  setAppModal({
    show: true,
    type: "save-success",
    title: "Lưu thông tin thành công",
    message: "Thông tin hồ sơ của bạn đã được cập nhật.",
    buttonText: "Đồng ý",
    cancelText: "",
    icon: "bi bi-check-lg",
    iconType: "success",
  });
} catch (error) {
  setAppModal({
    show: true,
    type: "save-error",
    title: "Lỗi kết nối",
    message: "Không thể kết nối đến server.",
    buttonText: "Đồng ý",
    cancelText: "",
    icon: "",
    iconType: "",
  });
}
};
const isProfileDirty = () => {
  return JSON.stringify(profileForm) !== JSON.stringify(savedProfileForm);
};
const handleCancelProfile = () => {
  if (!isProfileDirty()) {
    return;
  }

  setAppModal({
    show: true,
    type: "cancel-profile",
    title: "Hủy thay đổi?",
    message: "Thông tin đang nhập sẽ bị mất. Bạn có chắc muốn hủy không?",
    buttonText: "Có, hủy",
    cancelText: "Không",
    icon: "",
    iconType: "",
  });
};
const filteredUniversities = universities
  .filter((item) => {
    const keyword = universitySearch.toLowerCase();

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.code.toLowerCase().includes(keyword)
    );
  })
  .slice(0, 8);
  const handleSelectUniversity = (university) => {
  setUniversitySearch(`${university.name} (${university.code})`);

  setProfileForm((prev) => ({
    ...prev,
    university: university.code,
  }));

  setShowUniversityOptions(false);
};
useEffect(() => {
  const avatar =
    avatarList.find((item) =>
      item.includes(user?.avatar)
    ) || avatarList[0];

  setSelectedAvatar(avatar);
  setSelectedAvatarName(user?.avatar);
}, [user?.avatar]);
useEffect(() => {
  const formFromUser = buildProfileFormFromUser(user);

  setProfileForm(formFromUser);
  setSavedProfileForm(formFromUser);
   if (user?.university_name && user?.university_code) {
    setUniversitySearch(`${user.university_name} (${user.university_code})`);
  } else {
    setUniversitySearch("");
  }
}, [user]);

useEffect(() => {
  const fetchUniversities = async () => {
    const result = await getUniversities();

    if (result.success) {
      setUniversities(result.universities);
    }
  };

  fetchUniversities();
}, []);
  return (
    <main className="my-account-page">
      <div className="my-account-layout">

        {/* ── Sidebar ── */}
        <aside className="my-account-sidebar">
          <div className="sidebar-user">
            <img
  className="sidebar-user__avatar"
  src={selectedAvatar}
  alt="Người dùng"
/>
            <div className="sidebar-user__info">
                <h3 className="sidebar-user__name">
                    {user?.full_name || "Chưa cập nhật"}
                </h3>

  <p className="sidebar-user__username">
    @{user?.username || "username"}
  </p>

  <span className="sidebar-user__badge">
    Sinh viên
  </span>
</div>
          </div>

          <nav className="sidebar-nav" aria-label="Menu tài khoản">
            <a href="/my-account" className="sidebar-nav__item sidebar-nav__item--active">
              <i className="bi bi-person-circle sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Hồ sơ của tôi</span>
                <span className="sidebar-nav__desc">Quản lý thông tin cá nhân</span>
              </span>
            </a>

            <a href="/my-account/posts" className="sidebar-nav__item">
              <i className="bi bi-file-earmark-text sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Bài đăng của tôi</span>
                <span className="sidebar-nav__desc">Quản lý bài đăng đã tạo</span>
              </span>
            </a>

            <a href="/my-account/saved" className="sidebar-nav__item">
              <i className="bi bi-bookmark sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Bài viết đã lưu</span>
                <span className="sidebar-nav__desc">Những bài viết đã lưu</span>
              </span>
            </a>

            <a href="/my-account/orders" className="sidebar-nav__item">
              <i className="bi bi-bag sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Đơn hàng của tôi</span>
                <span className="sidebar-nav__desc">Quản lý đơn hàng</span>
              </span>
            </a>



            <a href="/my-account/bank" className="sidebar-nav__item">
              <i className="bi bi-bank sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Tài khoản ngân hàng</span>
                <span className="sidebar-nav__desc">Quản lý tài khoản ngân hàng</span>
              </span>
            </a>



            <a href="/my-account/notifications" className="sidebar-nav__item">
              <i className="bi bi-bell sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Thông báo</span>
                <span className="sidebar-nav__desc">Cài đặt thông báo</span>
              </span>
            </a>

            <a href="/my-account/settings" className="sidebar-nav__item">
              <i className="bi bi-gear sidebar-nav__icon" aria-hidden="true" />
              <span className="sidebar-nav__text">
                <span className="sidebar-nav__label">Cài đặt tài khoản</span>
                <span className="sidebar-nav__desc">Ngôn ngữ, giao diện,...</span>
              </span>
            </a>

            <button
  type="button"
  className="sidebar-nav__item sidebar-nav__item--logout"
  onClick={logout}
>
  <i
    className="bi bi-box-arrow-right sidebar-nav__icon"
    aria-hidden="true"
  />

  <span className="sidebar-nav__text">
    <span className="sidebar-nav__label">Đăng xuất</span>
  </span>
</button>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <section className="my-account-main">
          <header className="my-account-header">
            <h1 className="my-account-header__title">Hồ sơ của tôi</h1>
            <p className="my-account-header__subtitle">
              Cập nhật thông tin cá nhân để tăng độ tin cậy và sử dụng đầy đủ các tính năng
            </p>
          </header>

          <form className="my-account-form" onSubmit={handleSaveProfile}>
            <div className="my-account-card">
              <h2 className="my-account-card__title">Thông tin cá nhân</h2>

              <div className="profile-section">
                {/* Avatar */}
                <div className="profile-avatar">
                  <div className="profile-avatar__preview">
                    <img src={selectedAvatar} alt="Ảnh đại diện" />
                    <button
  type="button"
  className="profile-avatar__camera"
  aria-label="Đổi ảnh đại diện"
  onClick={() => setShowAvatarModal(true)}
>
                      <i className="bi bi-camera-fill" aria-hidden="true" />
                    </button>
                  </div>

                  <button
  type="button"
  className="btn btn-outline profile-avatar__change"
  onClick={() => setShowAvatarModal(true)}
>
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
                      <input id="username" name="username" type="text" className="form-field__input field--disabled" value={user?.username || ""} readOnly />
                      <span className="form-field__helper">Tên đăng nhập không thể thay đổi</span>
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="email">Email</label>
                      <input
  id="email"
  name="email"
  type="email"
  className="form-field__input field--disabled"
  value={user?.email || ""}
  readOnly
/>

{user?.is_verified ? (
  <span className="form-field__verify form-field__verify--success">
    <i className="bi bi-check-circle-fill"></i>
    Đã xác thực
  </span>
) : (
  <span className="form-field__verify form-field__verify--danger">
    <i className="bi bi-exclamation-circle-fill"></i>
    Chưa xác thực gmail.{" "}
    <a href="/verify-email">XÁC THỰC NGAY</a>
  </span>
)}
                    </div>
                  </div>

                  {/* Row 2: fullName */}
                  <div className="form-row form-row--2">
  <div className="form-field">
    <label className="form-field__label" htmlFor="fullName">Họ và tên
        {invalidFields.includes("full_name") && (
    <span className="required-star">*</span>
  )}</label>
    <input
      id="fullName"
      name="full_name"
      type="text"
      className={`form-field__input ${
    invalidFields.includes("full_name") ? "form-field__input--error" : ""
  }`}
      value={profileForm.full_name}
      onChange={handleProfileChange}
    />
  </div>

  <div className="form-field">
    <label className="form-field__label" htmlFor="phoneNumber">
  Số điện thoại
  {invalidFields.includes("phone_number") && (
    <span className="required-star">*</span>
  )}
</label>
    <input
      id="phoneNumber"
      name="phone_number"
      type="tel"
      className={`form-field__input ${
    invalidFields.includes("phone_number") ? "form-field__input--error" : ""
  }`}
      placeholder="VD: 0901234567"
      value={profileForm.phone_number}
      onChange={handleProfileChange}
    />
  </div>
</div>

                  {/* Row 3: dateOfBirth + gender */}
                  <div className="form-row form-row--2">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="dateOfBirth">Ngày sinh
                          {invalidFields.includes("date_of_birth") && (
    <span className="required-star">*</span>
  )}</label>
                      <input
  id="dateOfBirth"
  name="date_of_birth"
  type="date"
  className={`form-field__input ${
    invalidFields.includes("date_of_birth") ? "form-field__input--error" : ""
  }`}
  value={profileForm.date_of_birth}
  onChange={handleProfileChange}
/>
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="gender">Giới tính
                          {invalidFields.includes("gender") && (
    <span className="required-star">*</span>
  )}</label>
                      <select
  id="gender"
  name="gender"
   className={`form-field__input ${
    invalidFields.includes("gender") ? "form-field__input--error" : ""
  }`}
  value={profileForm.gender}
  onChange={handleProfileChange}
>
                        <option value="">Chọn giới tính</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="DEFAULT">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: startYear + endYear + isGraduated */}
                  <div className="form-row form-row--year-grad">
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="startYear">Năm bắt đầu học
                          {invalidFields.includes("academic_start_year") && (
    <span className="required-star">*</span>
  )}</label>
                      <input
  id="startYear"
  name="academic_start_year"
  type="number"
  className={`form-field__input ${
    invalidFields.includes("academic_start_year") ? "form-field__input--error" : ""
  }`}
  placeholder="VD: 2021"
  value={profileForm.academic_start_year}
  onChange={handleProfileChange}
/>
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="endYear">Năm kết thúc (dự kiến){invalidFields.includes("academic_end_year") && (
    <span className="required-star">*</span>
  )}</label>
                      <input
  id="endYear"
  name="academic_end_year"
  type="number"
   className={`form-field__input ${
    invalidFields.includes("academic_end_year") ? "form-field__input--error" : ""
  }`}
  placeholder="VD: 2025"
  value={profileForm.academic_end_year}
  onChange={handleProfileChange}
/>
                    </div>
                    <div className="form-field form-field--checkbox">
                      <span className="form-field__label">Đã tốt nghiệp</span>
                      <label className="checkbox-label" htmlFor="isGraduated">
                        <input
  id="isGraduated"
  name="is_graduated"
  type="checkbox"
  checked={profileForm.is_graduated}
  onChange={handleProfileChange}
/>
                        <span>Tôi đã tốt nghiệp</span>
                      </label>
                    </div>
                  </div>

                  {/* Row 5: university + faculty + major */}
                  <div className="form-row form-row--3">
                    <div className="form-field form-field--search">
  <label className="form-field__label" htmlFor="university">
    Trường
    {invalidFields.includes("university") && (
    <span className="required-star">*</span>
  )}
  </label>

  <input
    id="university"
    name="university"
    type="text"
    className={`form-field__input ${
    invalidFields.includes("university") ? "form-field__input--error" : ""
  }`}
    placeholder="Nhập tên trường hoặc mã trường"
    value={universitySearch}
    onChange={(e) => {
      setUniversitySearch(e.target.value);
      setShowUniversityOptions(true);

      setProfileForm((prev) => ({
        ...prev,
        university: "",
      }));
    }}
    onFocus={() => setShowUniversityOptions(true)}
    autoComplete="off"
  />

  {showUniversityOptions && universitySearch && (
    <div className="university-dropdown">
      {filteredUniversities.length > 0 ? (
        filteredUniversities.map((item) => (
          <button
            type="button"
            key={item.code}
            className="university-dropdown__item"
            onClick={() => handleSelectUniversity(item)}
          >
            <span>{item.name}</span>
            <strong>{item.code}</strong>
          </button>
        ))
      ) : (
        <div className="university-dropdown__empty">
          Không tìm thấy trường phù hợp
        </div>
      )}
    </div>
  )}
</div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="faculty">Khoa
                          {invalidFields.includes("faculty") && (
    <span className="required-star">*</span>
  )}</label>
                      <input
  id="faculty"
  name="faculty"
  type="text"
  className={`form-field__input ${
    invalidFields.includes("faculty") ? "form-field__input--error" : ""
  }`}
  placeholder="Chọn khoa"
  value={profileForm.faculty}
  onChange={handleProfileChange}
/>
                    </div>
                    <div className="form-field">
                      <label className="form-field__label" htmlFor="major">Ngành
                          {invalidFields.includes("major") && (
    <span className="required-star">*</span>
  )}</label>
                      <input
  id="major"
  name="major"
  type="text"
  className={`form-field__input ${
    invalidFields.includes("major") ? "form-field__input--error" : ""
  }`}
  placeholder="Chọn ngành"
  value={profileForm.major}
  onChange={handleProfileChange}
/>
                    </div>
                  </div>

                  {/* Nút Lưu thông tin */}
                  <div className="my-account-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-floppy" aria-hidden="true" />
                      Lưu thông tin
                    </button>
                    <button
  type="button"
  className="btn btn-secondary"
  onClick={handleCancelProfile}
>
  Hủy
</button>
                  </div>

                </div>
              </div>
            </div>
          </form>
        </section>

      </div>
      {showAvatarModal && (
  <div className="avatar-modal-backdrop">
    <div className="avatar-modal">

      <div className="avatar-modal__header">
        <h3>Chọn ảnh đại diện</h3>

        <button
          type="button"
          className="avatar-modal__close"
          onClick={() => setShowAvatarModal(false)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="avatar-modal__body">
        {avatarList.map((avatar, index) => (
          <button
            key={index}
            type="button"
            className={`avatar-modal__item ${
              selectedAvatar === avatar
                ? "avatar-modal__item--active"
                : ""
            }`}
            onClick={() => {
  setSelectedAvatar(avatar);

  const avatarName = avatar.split("/").pop();

  setSelectedAvatarName(avatarName);
}}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
            />
          </button>
        ))}
      </div>

      <div className="avatar-modal__footer">

  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => setShowAvatarModal(false)}
  >
    Đóng
  </button>

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleSaveAvatar}
  >
    Sử dụng
  </button>

</div>

    </div>
  </div>
)}
<AppModal
  show={appModal.show}
  title={appModal.title}
  message={appModal.message}
  buttonText={appModal.buttonText}
  cancelText={appModal.cancelText}
  icon={appModal.icon}
  iconType={appModal.iconType}
  onConfirm={handleModalConfirm}
  onCancel={closeAppModal}
  onClose={closeAppModal}
/>
    </main>

  );
}

export default MyAccount;