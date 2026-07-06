/**
 * AccountSidebarNav — nav menu mặc định cho sidebar /my-account
 *
 * Props:
 *   activePath — href hiện tại để highlight đúng item
 *                ví dụ: "/my-account", "/my-account/orders"
 *
 * CSS class kế thừa từ my-account.css (sidebar-user, sidebar-nav, ...).
 */

const NAV_ITEMS = [
  {
    href: "/my-account",
    icon: "bi-person-circle",
    label: "Hồ sơ của tôi",
    desc: "Quản lý thông tin cá nhân",
  },
  {
    href: "/my-account/posts",
    icon: "bi-file-earmark-text",
    label: "Bài đăng của tôi",
    desc: "Quản lý bài đăng đã tạo",
  },
  {
    href: "/my-account/saved",
    icon: "bi-bookmark",
    label: "Bài viết đã lưu",
    desc: "Những bài viết đã lưu",
  },
  {
    href: "/my-account/orders",
    icon: "bi-bag",
    label: "Đơn hàng của tôi",
    desc: "Quản lý đơn hàng",
  },
  {
    href: "/my-account/wallet",
    icon: "bi-wallet2",
    label: "Ví của tôi",
    desc: "Số dư và lịch sử giao dịch",
  },
  {
    href: "/my-account/bank",
    icon: "bi-bank",
    label: "Tài khoản ngân hàng",
    desc: "Quản lý tài khoản ngân hàng",
  },
  {
    href: "/my-account/security",
    icon: "bi-shield-lock",
    label: "Bảo mật",
    desc: "Đổi mật khẩu, bảo mật 2 lớp",
  },
  {
    href: "/my-account/notifications",
    icon: "bi-bell",
    label: "Thông báo",
    desc: "Cài đặt thông báo",
  },
  {
    href: "/my-account/settings",
    icon: "bi-gear",
    label: "Cài đặt tài khoản",
    desc: "Ngôn ngữ, giao diện,...",
  },
];

function AccountSidebarNav({ activePath = "/my-account" }) {
  return (
    <>
      {/* User info */}
      <div className="sidebar-user">
        <img
          className="sidebar-user__avatar"
          src="https://i.pravatar.cc/100"
          alt="Người dùng"
        />
        <div className="sidebar-user__info">
          <p className="sidebar-user__name">Người dùng</p>
          <p className="sidebar-user__username">@username</p>
          <span className="sidebar-user__badge">Sinh viên</span>
        </div>
      </div>

      {/* Nav menu */}
      <nav className="sidebar-nav" aria-label="Menu tài khoản">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`sidebar-nav__item${
              activePath === item.href ? " sidebar-nav__item--active" : ""
            }`}
            aria-current={activePath === item.href ? "page" : undefined}
          >
            <i className={`bi ${item.icon} sidebar-nav__icon`} aria-hidden="true" />
            <span className="sidebar-nav__text">
              <span className="sidebar-nav__label">{item.label}</span>
              <span className="sidebar-nav__desc">{item.desc}</span>
            </span>
          </a>
        ))}

        {/* Đăng xuất — tách riêng khỏi NAV_ITEMS */}
        <a href="#" className="sidebar-nav__item sidebar-nav__item--logout">
          <i className="bi bi-box-arrow-right sidebar-nav__icon" aria-hidden="true" />
          <span className="sidebar-nav__text">
            <span className="sidebar-nav__label">Đăng xuất</span>
          </span>
        </a>
      </nav>
    </>
  );
}

export default AccountSidebarNav;
