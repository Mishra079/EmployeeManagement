import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top"
      style={{ marginLeft: 'var(--sidebar-width)', zIndex: 1030 }}
    >
      <div className="container-fluid px-4">
        <span className="navbar-text text-muted d-none d-md-block">
          Welcome back, <strong>{user?.name}</strong>
        </span>
        <div className="d-flex align-items-center gap-3 ms-auto">
          <span className="badge bg-primary">{user?.role}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
