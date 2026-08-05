import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showError } from '../hooks/useToast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      showError('Invalid credentials. Use admin@ems.com / admin123');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="card login-card shadow-lg">
        <div className="text-center mb-4">
          <i className="bi bi-briefcase-fill text-primary" style={{ fontSize: '3rem' }}></i>
          <h3 className="mt-2 fw-bold">Employee Management</h3>
          <p className="text-muted">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-muted text-center mt-3 small">
          Demo: admin@ems.com / admin123
        </p>
      </div>
    </div>
  );
}
