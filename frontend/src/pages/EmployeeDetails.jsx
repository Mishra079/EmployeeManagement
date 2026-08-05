import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import employeeService from '../services/employeeService';
import { showError } from '../hooks/useToast';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService
      .getById(id)
      .then(({ data }) => setEmployee(data))
      .catch((err) => showError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading employee details..." />;
  if (!employee) return <div className="alert alert-warning">Employee not found</div>;

  const fields = [
    { label: 'Employee Code', value: employee.employeeCode },
    { label: 'Email', value: employee.email },
    { label: 'Phone', value: employee.phone || '—' },
    { label: 'Gender', value: employee.gender || '—' },
    { label: 'Date of Birth', value: employee.dateOfBirth || '—' },
    { label: 'Department', value: employee.departmentName },
    { label: 'Designation', value: employee.designation },
    { label: 'Salary', value: `$${Number(employee.salary).toLocaleString()}` },
    { label: 'Joining Date', value: employee.joiningDate || '—' },
    { label: 'Status', value: employee.status },
    { label: 'Address', value: employee.address || '—' },
    { label: 'City', value: employee.city || '—' },
    { label: 'State', value: employee.state || '—' },
    { label: 'Country', value: employee.country || '—' },
    { label: 'Zip Code', value: employee.zipCode || '—' },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Employee Details</h2>
        <div className="d-flex gap-2">
          <Link to={`/employees/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-1"></i> Edit
          </Link>
          <Link to="/employees" className="btn btn-outline-secondary">
            Back to List
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
            <img
              src={
                employee.profileImage ||
                `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&size=128`
              }
              alt="Profile"
              className="rounded-circle"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div>
              <h3 className="mb-1">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-muted mb-1">{employee.designation}</p>
              <span
                className={`badge ${
                  employee.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'
                }`}
              >
                {employee.status}
              </span>
            </div>
          </div>

          <div className="row g-3">
            {fields.map((field) => (
              <div key={field.label} className="col-md-4">
                <small className="text-muted d-block">{field.label}</small>
                <strong>{field.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
