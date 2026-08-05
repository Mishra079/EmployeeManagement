import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DepartmentTable from '../components/DepartmentTable';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import departmentService from '../services/departmentService';
import { showSuccess, showError } from '../hooks/useToast';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const { data } = await departmentService.getAll();
      setDepartments(data);
    } catch (err) {
      showError(err.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await departmentService.delete(deleteTarget.id);
      showSuccess('Department deleted successfully');
      setDeleteTarget(null);
      fetchDepartments();
    } catch (err) {
      showError(err.message || 'Failed to delete department');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Departments</h2>
        <Link to="/departments/add" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Add Department
        </Link>
      </div>

      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DepartmentTable departments={departments} onDelete={setDeleteTarget} />
          )}
        </div>
      </div>

      <ConfirmDialog
        show={!!deleteTarget}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Departments with employees cannot be deleted.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
