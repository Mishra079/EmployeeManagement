import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary">
        <i className="bi bi-house me-1"></i> Go to Dashboard
      </Link>
    </div>
  );
}
