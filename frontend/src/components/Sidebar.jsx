import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { path: '/employees', icon: 'bi-people', label: 'Employees' },
  { path: '/departments', icon: 'bi-building', label: 'Departments' },
];

export default function Sidebar() {
  return (
    <aside
      className="sidebar position-fixed top-0 start-0 h-100 d-flex flex-column"
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--sidebar-bg)',
        zIndex: 1040,
      }}
    >
      <div className="p-4 border-bottom border-secondary">
        <h4 className="text-white mb-0 fw-bold">
          <i className="bi bi-briefcase-fill me-2"></i>EMS
        </h4>
        <small className="text-muted">Employee Management</small>
      </div>
      <nav className="flex-grow-1 p-3">
        <ul className="nav flex-column gap-1">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link rounded px-3 py-2 d-flex align-items-center gap-2 ${
                    isActive ? 'active bg-primary text-white' : 'text-secondary'
                  }`
                }
                style={{ color: 'var(--sidebar-text)' }}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-3 border-top border-secondary">
        <small className="text-muted">v1.0.0</small>
      </div>
    </aside>
  );
}
