function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">I</div>
        <h2>IncidentIQ</h2>
      </div>
      <div className="navbar-actions">
        <button
          className="notification-button"
          aria-label="Notifications"
          type="button"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
        </button>
        <div className="user-profile">
          <div className="user-avatar">U</div>
          <span>admin</span>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
