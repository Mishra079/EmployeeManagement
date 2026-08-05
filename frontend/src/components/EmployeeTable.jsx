import { Link } from 'react-router-dom';

export default function EmployeeTable({
  employees,
  sortBy,
  direction,
  onSort,
  onDelete,
}) {
  const handleSort = (field) => {
    const newDirection = sortBy === field && direction === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <i className="bi bi-arrow-down-up ms-1 text-muted"></i>;
    return (
      <i
        className={`bi bi-arrow-${direction === 'asc' ? 'up' : 'down'} ms-1`}
      ></i>
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Photo</th>
            <th role="button" onClick={() => handleSort('employeeCode')}>
              Code <SortIcon field="employeeCode" />
            </th>
            <th role="button" onClick={() => handleSort('firstName')}>
              Name <SortIcon field="firstName" />
            </th>
            <th>Department</th>
            <th>Designation</th>
            <th role="button" onClick={() => handleSort('salary')}>
              Salary <SortIcon field="salary" />
            </th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <img
                    src={
                      emp.profileImage ||
                      `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}`
                    }
                    alt={`${emp.firstName} ${emp.lastName}`}
                    className="profile-img"
                  />
                </td>
                <td>
                  <code>{emp.employeeCode}</code>
                </td>
                <td className="fw-medium">
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.departmentName}</td>
                <td>{emp.designation}</td>
                <td>${Number(emp.salary).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      emp.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Link
                      to={`/employees/${emp.id}`}
                      className="btn btn-outline-info"
                      title="View"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link
                      to={`/employees/${emp.id}/edit`}
                      className="btn btn-outline-primary"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      title="Delete"
                      onClick={() => onDelete(emp)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
