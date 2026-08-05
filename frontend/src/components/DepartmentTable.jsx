import { Link } from 'react-router-dom';

export default function DepartmentTable({ departments, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dept, index) => (
              <tr key={dept.id}>
                <td>{index + 1}</td>
                <td className="fw-medium">{dept.name}</td>
                <td className="text-muted">{dept.description || '—'}</td>
                <td>
                  <span className="badge bg-secondary">{dept.employeeCount}</span>
                </td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Link
                      to={`/departments/${dept.id}/edit`}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(dept)}
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
