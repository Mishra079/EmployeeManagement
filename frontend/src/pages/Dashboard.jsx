import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';
import LoadingSpinner from '../components/LoadingSpinner';
import dashboardService from '../services/dashboardService';
import { showError } from '../hooks/useToast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        showError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <Link to="/employees/add" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Add Employee
        </Link>
      </div>

      <DashboardCards stats={stats} loading={loading} />

      {!loading && stats?.departments?.length > 0 && (
        <div className="card">
          <div className="card-header">Department Overview</div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Description</th>
                    <th>Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.departments.map((dept) => (
                    <tr key={dept.id}>
                      <td className="fw-medium">{dept.name}</td>
                      <td className="text-muted">{dept.description || '—'}</td>
                      <td>
                        <span className="badge bg-primary">{dept.employeeCount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner message="Loading dashboard..." />}
    </div>
  );
}
