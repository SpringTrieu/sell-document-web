import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-overlay">
        <div className="container">
          <div className="row gy-4 footer-menu">
            <div className="col-6 col-md-3 col-lg">
              <h6>Tài liệu</h6>

              <Link to="/documents">Tìm tài liệu</Link>
              <Link to="/documents/new">Tài liệu mới</Link>
              <Link to="/documents/featured">Tài liệu nổi bật</Link>
              <Link to="/preview">Xem preview</Link>
            </div>

            <div className="col-6 col-md-3 col-lg">
              <h6>Tài khoản</h6>

              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
              <Link to="/saved-documents">Lưu tài liệu</Link>
              <Link to="/wallet">Ví tiền</Link>
            </div>

            <div className="col-6 col-md-3 col-lg">
              <h6>Trao đổi</h6>

              <Link to="/comments">Bình luận</Link>
              <Link to="/messages">Nhắn tin</Link>
              <Link to="/posts/create">Đăng bài</Link>
              <Link to="/jobs">Việc làm</Link>
            </div>

            <div className="col-6 col-md-3 col-lg">
              <h6>Hỗ trợ</h6>

              <Link to="/contact">Liên hệ</Link>
              <Link to="/guide">Hướng dẫn</Link>
              <Link to="/policy">Chính sách</Link>
              <Link to="/report">Báo cáo vi phạm</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Học Tốt</span>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
