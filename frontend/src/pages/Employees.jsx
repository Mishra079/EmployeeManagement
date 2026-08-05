import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import employeeService from '../services/employeeService';
import departmentService from '../services/departmentService';
import { showSuccess, showError } from '../hooks/useToast';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('firstName');
  const [direction, setDirection] = useState('asc');
  const [keyword, setKeyword] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 10, sortBy, direction };
      let response;

      if (keyword.trim()) {
        response = await employeeService.search(keyword.trim(), params);
      } else if (departmentFilter || statusFilter) {
        const filters = {};
        if (departmentFilter) filters.department = departmentFilter;
        if (statusFilter) filters.status = statusFilter;
        response = await employeeService.filter(filters, params);
      } else {
        response = await employeeService.getAll(params);
      }

      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      showError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, direction, keyword, departmentFilter, statusFilter]);

  useEffect(() => {
    departmentService.getAll().then(({ data }) => setDepartments(data)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSort = (field, dir) => {
    setSortBy(field);
    setDirection(dir);
    setPage(0);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await employeeService.delete(deleteTarget.id);
      showSuccess('Employee deleted successfully');
      setDeleteTarget(null);
      fetchEmployees();
    } catch (err) {
      showError(err.message || 'Failed to delete employee');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchEmployees();
  };

  return (
    <div>
      <div className="page-header">
        <h2>Employees</h2>
        <Link to="/employees/add" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Add Employee
        </Link>
      </div>

      <div className="filter-bar">
        <form onSubmit={handleSearch} className="row g-2 align-items-end">
          <div className="col-md-4">
            <label className="form-label small">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, department..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label small">Department</label>
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => { setDepartmentFilter(e.target.value); setPage(0); }}
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label small">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-outline-primary me-2">
              <i className="bi bi-search me-1"></i> Search
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setKeyword('');
                setDepartmentFilter('');
                setStatusFilter('');
                setPage(0);
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <EmployeeTable
                employees={employees}
                sortBy={sortBy}
                direction={direction}
                onSort={handleSort}
                onDelete={setDeleteTarget}
              />
              <div className="p-3">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        show={!!deleteTarget}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
