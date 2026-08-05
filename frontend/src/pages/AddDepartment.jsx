import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import departmentService from '../services/departmentService';
import { validateDepartmentForm } from '../utils/validators';
import { showSuccess, showError } from '../hooks/useToast';

export default function AddDepartment() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateDepartmentForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await departmentService.create(formData);
      showSuccess('Department created successfully');
      navigate('/departments');
    } catch (err) {
      showError(err.message || 'Failed to create department');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Add Department</h2>
        <Link to="/departments" className="btn btn-outline-secondary">Back</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({});
                }}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Create Department'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
