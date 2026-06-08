import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-content text-center">
          <span className="hero-badge">Nền tảng tài liệu cho sinh viên</span>

          <h1>Nơi sinh viên học tốt hơn</h1>

          <p>Kết Bạn, Tìm Kiếm & Hỗ Trợ Trao Đổi</p>

          <div className="search-wrapper mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm tài liệu, môn học, ngành học..."
            />

            <button className="btn" type="button">
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="container">
          <div className="section-title text-center">
            <h2>Chức năng nổi bật</h2>
            <p>Các chức năng chính dành cho sinh viên trên hệ thống.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="icon-box">
                  <i className="bi bi-search"></i>
                </div>

                <h5>Tìm tài liệu</h5>

                <p>Tìm kiếm tài liệu theo môn học, ngành học hoặc từ khóa nhanh chóng.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="icon-box">
                  <i className="bi bi-file-earmark-text"></i>
                </div>

                <h5>Xem preview</h5>

                <p>Xem trước nội dung tài liệu trước khi tải xuống hoặc mua.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="icon-box">
                  <i className="bi bi-cloud-arrow-up"></i>
                </div>

                <h5>Đăng tài liệu</h5>

                <p>Chia sẻ tài liệu học tập của bạn cho cộng đồng sinh viên.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="icon-box">
                  <i className="bi bi-chat-dots"></i>
                </div>

                <h5>Trao đổi</h5>

                <p>Bình luận, nhắn tin và trao đổi trực tiếp với sinh viên khác.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="document-section">
        <div className="container">
          <div className="document-box">
            <div>
              <span className="small-title">Tài liệu nổi bật</span>

              <h3>Khám phá kho tài liệu được quan tâm nhiều nhất</h3>

              <p>
                Giáo trình, slide bài giảng, đề cương ôn tập, bài mẫu và nhiều tài liệu
                hữu ích khác.
              </p>
            </div>

            <Link to="/documents" className="btn btn-main">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
