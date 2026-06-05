import "../../styles/pages/account/my-account.css";

function MyAccount() {
  return (
    <main className="account-page">
      <div className="account-container">
        <aside className="account-sidebar">
  <h3 className="sidebar-title">Tài khoản của tôi</h3>

  <div className="account-user-box">
    <div className="account-avatar-img">
      <img src="https://i.pravatar.cc/100" alt="avatar" />
    </div>

    <div>
      <h3>Nguyễn Văn A</h3>
      <p>@nguyenvana</p>
      <span>Sinh viên</span>
    </div>
  </div>

  <nav className="account-menu">

  <a className="active">
    <i className="bi bi-person-circle"></i>
    <div>
      <strong>Hồ sơ của tôi</strong>
      <p>Quản lý thông tin cá nhân</p>
    </div>
  </a>

  <a>
    <i className="bi bi-file-earmark-text"></i>
    <div>
      <strong>Bài đăng của tôi</strong>
      <p>Quản lý bài đăng đã tạo</p>
    </div>
  </a>

  <a>
    <i className="bi bi-bookmark"></i>
    <div>
      <strong>Bài viết đã lưu</strong>
      <p>Những bài viết đã lưu</p>
    </div>
  </a>



  <a>
    <i className="bi bi-cash-stack"></i>
    <div>
      <strong>Doanh thu</strong>
      <p>Lịch sử thu nhập</p>
    </div>
  </a>

  <a>
    <i className="bi bi-bank"></i>
    <div>
      <strong>Tài khoản ngân hàng</strong>
      <p>Quản lý tài khoản ngân hàng</p>
    </div>
  </a>

  <a>
    <i className="bi bi-shield-lock"></i>
    <div>
      <strong>Bảo mật</strong>
      <p>Đổi mật khẩu, bảo mật 2 lớp</p>
    </div>
  </a>

  <a>
    <i className="bi bi-bell"></i>
    <div>
      <strong>Thông báo</strong>
      <p>Cài đặt thông báo</p>
    </div>
  </a>



</nav>

  <button className="sidebar-logout">
  <i className="bi bi-box-arrow-right me-2"></i>
  Đăng xuất
</button>

  <div className="profile-progress-box">
    <div className="progress-title">
      <span>Hoàn thiện hồ sơ</span>
      <strong>85%</strong>
    </div>

    <div className="progress-bar">
      <div></div>
    </div>

    <p>Điền đầy đủ thông tin để có trải nghiệm tốt hơn</p>

    <button>Hoàn thiện ngay →</button>
  </div>
</aside>

        <section className="account-content">
  <div className="account-page-header">
    <h2>Hồ sơ của tôi</h2>
    <p>Cập nhật thông tin cá nhân để tăng độ tin cậy và sử dụng đầy đủ các tính năng</p>
  </div>

  <div className="account-card">
    <div className="account-section-title">
      <h3>Thông tin cá nhân</h3>
    </div>

    <form className="profile-form">
  <div className="profile-layout">
    <div className="profile-avatar-box">
      <label>Ảnh đại diện</label>

      <div className="profile-avatar-preview">
        <img src="https://i.pravatar.cc/120" alt="avatar" />
        <button type="button">
          <i className="bi bi-camera-fill"></i>
        </button>
      </div>

      <p>JPG, PNG tối đa 2MB</p>
      <button type="button" className="btn-change-avatar">Đổi ảnh</button>
    </div>

    <div className="profile-form-fields">
      <div className="form-row two">
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input type="text" value="nguyenvana" readOnly />
          <small>Tên đăng nhập không thể thay đổi</small>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value="nguyenvana@gmail.com" readOnly />
          <small>Email không thể thay đổi</small>
        </div>
      </div>

      <div className="form-group">
        <label>Họ và tên</label>
        <input type="text" defaultValue="Nguyễn Văn A" />
      </div>

      <div className="form-row two">
        <div className="form-group">
          <label>Ngày sinh</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <select>
            <option>Nam</option>
            <option>Nữ</option>
            <option>Khác</option>
          </select>
        </div>
      </div>

      <div className="form-row three">
        <div className="form-group">
          <label>Năm bắt đầu học</label>
          <select><option>2021</option></select>
        </div>

        <div className="form-group">
          <label>Năm kết thúc học</label>
          <select><option>2025</option></select>
        </div>

        <div className="form-group checkbox-group">
          <label>Đã tốt nghiệp</label>
          <div>
            <input type="checkbox" />
            <span>Tôi đã tốt nghiệp</span>
          </div>
        </div>
      </div>

      <div className="form-row three">
        <div className="form-group">
          <label>Trường</label>
          <select><option>Đại học Bách Khoa Hà Nội</option></select>
        </div>

        <div className="form-group">
          <label>Khoa</label>
          <select><option>Công nghệ thông tin</option></select>
        </div>

        <div className="form-group">
          <label>Ngành</label>
          <select><option>Khoa học máy tính</option></select>
        </div>
      </div>

      <div className="profile-actions">
        <button type="button" className="btn-save-profile">
          Lưu thông tin
        </button>
      </div>
    </div>
  </div>
</form>
  </div>
</section>
      </div>
    </main>
  );
}

export default MyAccount;