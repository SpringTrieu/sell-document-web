import "../../styles/pages/account/my-account.css";

/**
 * AccountSidebarLayout — wrapper layout cho tất cả trang /my-account/*
 *
 * Props:
 *   sidebar  — nội dung bên trong <aside> (thay đổi theo từng trang)
 *   children — nội dung main content (phần phải layout)
 *
 * Dùng CSS class từ my-account.css (giữ nguyên, không viết lại).
 */
function AccountSidebarLayout({ sidebar, children }) {
  return (
    <main className="my-account-page">
      <div className="my-account-layout">

        {/* ── Sidebar ── */}
        <aside className="my-account-sidebar">
          {sidebar}
        </aside>

        {/* ── Main content ── */}
        <section className="my-account-main">
          {children}
        </section>

      </div>
    </main>
  );
}

export default AccountSidebarLayout;
