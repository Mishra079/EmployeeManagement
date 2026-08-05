import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
