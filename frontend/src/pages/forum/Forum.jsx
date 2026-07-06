import { useEffect } from "react";
import "../../styles/pages/forum/Forum.css";

function Forum() {
  // Fix designfrontend.md § 4: đo chiều cao thật của header và set CSS variable
  // --forum-header-h để các sidebar sticky và min-height luôn khớp thực tế,
  // không phụ thuộc vào giá trị fallback cứng 65px trong CSS.
  useEffect(() => {
    const header = document.querySelector(".account-header");
    if (!header) return;

    const setHeaderHeight = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--forum-header-h", `${h}px`);
    };

    setHeaderHeight(); // đo ngay khi mount

    const ro = new ResizeObserver(setHeaderHeight);
    ro.observe(header);

    return () => ro.disconnect(); // cleanup khi unmount
  }, []);

  return (
    <div className="forum-page">

      {/* ================================================================
          LEFT SIDEBAR — điều hướng
          ================================================================ */}
      <aside className="forum-left-sidebar">

        <nav className="forum-nav">
          <a href="/" className="forum-nav__item">
            <i className="bi bi-house forum-nav__icon"></i>
            <span className="forum-nav__label">Trang chủ</span>
          </a>
          <a href="/documents" className="forum-nav__item">
            <i className="bi bi-file-earmark-text forum-nav__icon"></i>
            <span className="forum-nav__label">Tài liệu</span>
          </a>
          <a href="/forum" className="forum-nav__item forum-nav__item--active" aria-current="page">
            <i className="bi bi-chat-square-text forum-nav__icon"></i>
            <span className="forum-nav__label">Diễn đàn</span>
          </a>
          <a href="/classroom" className="forum-nav__item">
            <i className="bi bi-mortarboard forum-nav__icon"></i>
            <span className="forum-nav__label">Lớp học</span>
          </a>
          <a href="/saved" className="forum-nav__item">
            <i className="bi bi-bookmark-heart forum-nav__icon"></i>
            <span className="forum-nav__label">Yêu thích</span>
          </a>
          <a href="/history" className="forum-nav__item">
            <i className="bi bi-clock-history forum-nav__icon"></i>
            <span className="forum-nav__label">Lịch sử</span>
          </a>
          <a href="/notifications" className="forum-nav__item">
            <i className="bi bi-bell forum-nav__icon"></i>
            <span className="forum-nav__label">Thông báo</span>
          </a>
          <a href="/messages" className="forum-nav__item">
            <i className="bi bi-chat-left-text forum-nav__icon"></i>
            <span className="forum-nav__label">Tin nhắn</span>
          </a>
          <a href="/wallet" className="forum-nav__item">
            <i className="bi bi-wallet2 forum-nav__icon"></i>
            <span className="forum-nav__label">Nạp tiền</span>
          </a>
          <a href="/settings" className="forum-nav__item">
            <i className="bi bi-gear forum-nav__icon"></i>
            <span className="forum-nav__label">Cài đặt</span>
          </a>
        </nav>

        {/* Premium box */}
        <div className="forum-premium-box">
          <i className="bi bi-stars forum-premium-box__icon"></i>
          <p className="forum-premium-box__title">Gói thành viên Premium</p>
          <p className="forum-premium-box__desc">
            Tải tài liệu không giới hạn và nhiều ưu đãi khác!
          </p>
          <button className="forum-premium-box__btn">Nâng cấp ngay</button>
        </div>

      </aside>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="forum-main">

        {/* Header khu vực nội dung */}
        <div className="forum-content-header">
          <div>
            <h1 className="forum-content-header__title">Diễn đàn</h1>
            <p className="forum-content-header__subtitle">Nơi sinh viên kết nối và hỗ trợ nhau</p>
          </div>
          <button className="forum-btn-post">
            <i className="bi bi-plus-lg"></i>
            Đăng bài viết
          </button>
        </div>

        {/* Tabs danh mục */}
        <div className="forum-tabs" role="tablist">
          <button className="forum-tab forum-tab--active" role="tab">Tất cả</button>
          <button className="forum-tab" role="tab">Việc làm thêm</button>
          <button className="forum-tab" role="tab">Hỗ trợ học tập</button>
          <button className="forum-tab" role="tab">Đồ án - Bài tập</button>
          <button className="forum-tab" role="tab">Mua bán</button>
          <button className="forum-tab" role="tab">Khác</button>
        </div>

        {/* Danh sách bài đăng — backend thay thế bằng dữ liệu API */}
        <div className="forum-post-list">

          {/* Card 1 */}
          <article className="forum-post-card">
            <div className="forum-post-card__top">
              <div className="forum-post-card__author">
                <div className="forum-post-card__avatar" style={{ backgroundColor: "#7c3aed" }}>ĐT</div>
                <div className="forum-post-card__author-info">
                  <span className="forum-post-card__author-name">Trần Minh Đức</span>
                  <span className="forum-post-card__author-school">Kinh tế · UEH</span>
                </div>
              </div>
              <div className="forum-post-card__top-right">
                <span className="forum-post-card__time">12 giờ trước</span>
                <button className="forum-post-card__bookmark" aria-label="Lưu bài viết">
                  <i className="bi bi-bookmark"></i>
                </button>
              </div>
            </div>
            <span className="forum-post-card__badge forum-badge--viec-lam">Việc làm thêm</span>
            <h2 className="forum-post-card__title">Cần 2 bạn điểm danh hộ môn Marketing (Thứ 3 – Tiết 1,2)</h2>
            <p className="forum-post-card__desc">Mình cần 2 bạn điểm danh hộ môn Marketing vào thứ 3 hàng tuần (tiết 1,2). Lớp ở cơ sở B. Mình sẽ có mặt hỗ trợ khi cần.</p>
            <div className="forum-post-card__meta">
              <span className="forum-post-card__meta-item">
                <i className="bi bi-cash-coin"></i>
                <span className="forum-post-card__price">50.000 đ / buổi</span>
              </span>
              <span className="forum-post-card__meta-item">
                <i className="bi bi-geo-alt"></i>
                <span>UEH – Cơ sở B</span>
              </span>
              <span className="forum-post-card__meta-item">
                <i className="bi bi-calendar3"></i>
                <span>Còn 5 buổi</span>
              </span>
            </div>
            <div className="forum-post-card__bottom">
              <button className="forum-btn-detail">Xem chi tiết <i className="bi bi-arrow-right"></i></button>
            </div>
          </article>

          {/* Card 2 */}
          <article className="forum-post-card">
            <div className="forum-post-card__top">
              <div className="forum-post-card__author">
                <div className="forum-post-card__avatar" style={{ backgroundColor: "#0369a1" }}>NL</div>
                <div className="forum-post-card__author-info">
                  <span className="forum-post-card__author-name">Lê Bảo Ngọc</span>
                  <span className="forum-post-card__author-school">CNTT · HCMUT</span>
                </div>
              </div>
              <div className="forum-post-card__top-right">
                <span className="forum-post-card__time">1 ngày trước</span>
                <button className="forum-post-card__bookmark" aria-label="Lưu bài viết">
                  <i className="bi bi-bookmark"></i>
                </button>
              </div>
            </div>
            <span className="forum-post-card__badge forum-badge--viec-lam">Việc làm thêm</span>
            <h2 className="forum-post-card__title">Cần người điểm danh hộ môn Lập trình Python</h2>
            <p className="forum-post-card__desc">Cần bạn điểm danh hộ môn Lập trình Python (Thứ 5 – Tiết 3,4) tại phòng B4-204. Mình học online nên không đi được. Ưu tiên bạn nữ.</p>
            <div className="forum-post-card__meta">
              <span className="forum-post-card__meta-item">
                <i className="bi bi-cash-coin"></i>
                <span className="forum-post-card__price">60.000 đ / buổi</span>
              </span>
              <span className="forum-post-card__meta-item">
                <i className="bi bi-geo-alt"></i>
                <span>HCMUT – Dãy B4</span>
              </span>
              <span className="forum-post-card__meta-item">
                <i className="bi bi-calendar3"></i>
                <span>Còn 3 buổi</span>
              </span>
            </div>
            <div className="forum-post-card__bottom">
              <button className="forum-btn-detail">Xem chi tiết <i className="bi bi-arrow-right"></i></button>
            </div>
          </article>


        </div>


      </main>

      {/* ================================================================
          RIGHT SIDEBAR — Bộ lọc tìm kiếm
          ================================================================ */}
      <aside className="forum-right-sidebar">

        {/* Filter box */}
        <div className="forum-filter-box">
          <h2 className="forum-filter-box__title">Bộ lọc tìm kiếm</h2>

          <div className="forum-filter-group">

            {/* Từ khóa */}
            <div>
              <label className="forum-filter-label" htmlFor="filter-keyword">Từ khóa</label>
              <div className="forum-filter-search-wrap">
                <input
                  id="filter-keyword"
                  type="text"
                  className="forum-filter-input"
                  placeholder="Tìm kiếm..."
                />
                <i className="bi bi-search"></i>
              </div>
            </div>

            {/* Danh mục */}
            <div>
              <label className="forum-filter-label" htmlFor="filter-category">Danh mục</label>
              <div className="forum-filter-select-wrap">
                <select id="filter-category" className="forum-filter-select">
                  <option value="">Tất cả danh mục</option>
                  <option value="jobs">Việc làm thêm</option>
                  <option value="tutoring">Hỗ trợ học tập</option>
                  <option value="projects">Đồ án - Bài tập</option>
                  <option value="trade">Mua bán</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            {/* Mức giá */}
            <div>
              <label className="forum-filter-label" htmlFor="filter-price">Mức giá</label>
              <div className="forum-filter-select-wrap">
                <select id="filter-price" className="forum-filter-select">
                  <option value="">Tất cả mức giá</option>
                  <option value="free">Miễn phí</option>
                  <option value="0-50">0 – 50.000 đ</option>
                  <option value="50-100">50.000 – 100.000 đ</option>
                  <option value="100+">Trên 100.000 đ</option>
                </select>
              </div>
            </div>

            {/* Khu vực */}
            <div>
              <label className="forum-filter-label" htmlFor="filter-region">Khu vực</label>
              <div className="forum-filter-select-wrap">
                <select id="filter-region" className="forum-filter-select">
                  <option value="">Tất cả khu vực</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="online">Online</option>
                </select>
              </div>
            </div>

            {/* Thời gian đăng */}
            <div>
              <label className="forum-filter-label" htmlFor="filter-time">Thời gian đăng</label>
              <div className="forum-filter-select-wrap">
                <select id="filter-time" className="forum-filter-select">
                  <option value="newest">Mới nhất</option>
                  <option value="today">Hôm nay</option>
                  <option value="week">7 ngày qua</option>
                  <option value="month">30 ngày qua</option>
                </select>
              </div>
            </div>

          </div>

          <hr className="forum-filter-divider" />

          <button className="forum-btn-apply">Áp dụng bộ lọc</button>
          <button className="forum-btn-reset">Đặt lại</button>
        </div>

        {/* Rules box */}
        <div className="forum-rules-box">
          <h3 className="forum-rules-box__title">Lưu ý khi tham gia diễn đàn</h3>
          <ul className="forum-rules-list">
            <li className="forum-rules-list__item">
              <i className="bi bi-person-check" style={{ color: "#1197c0" }}></i>
              <span>Kiểm tra thông tin ký trước khi nhận việc</span>
            </li>
            <li className="forum-rules-list__item">
              <i className="bi bi-clock" style={{ color: "#1197c0" }}></i>
              <span>Thỏa thuận rõ ràng về thời gian và chi phí</span>
            </li>
            <li className="forum-rules-list__item">
              <i className="bi bi-chat-dots" style={{ color: "#1197c0" }}></i>
              <span>Giữ liên lạc lịch sự, văn minh</span>
            </li>
            <li className="forum-rules-list__item">
              <i className="bi bi-flag" style={{ color: "#1197c0" }}></i>
              <span>Báo cáo bài viết vi phạm quy định</span>
            </li>
          </ul>
          <a href="#" className="forum-rules-link">Xem nội quy diễn đàn →</a>
        </div>

      </aside>

    </div>
  );
}

export default Forum;