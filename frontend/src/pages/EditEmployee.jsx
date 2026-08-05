import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import departmentService from '../services/departmentService';
import employeeService from '../services/employeeService';
import { validateEmployeeForm } from '../utils/validators';
import { showSuccess, showError } from '../hooks/useToast';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([employeeService.getById(id), departmentService.getAll()])
      .then(([empRes, deptRes]) => {
        const emp = empRes.data;
        setFormData({
          employeeCode: emp.employeeCode,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone || '',
          gender: emp.gender || '',
          dateOfBirth: emp.dateOfBirth || '',
          departmentId: emp.departmentId,
          designation: emp.designation,
          salary: emp.salary,
          joiningDate: emp.joiningDate || '',
          address: emp.address || '',
          city: emp.city || '',
          state: emp.state || '',
          country: emp.country || '',
          zipCode: emp.zipCode || '',
          status: emp.status,
          profileImage: emp.profileImage || '',
        });
        setDepartments(deptRes.data);
      })
      .catch((err) => showError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEmployeeForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await employeeService.update(id, formData);
      showSuccess('Employee updated successfully');
      navigate('/employees');
    } catch (err) {
      showError(err.message || 'Failed to update employee');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!formData) return <div className="alert alert-warning">Employee not found</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Edit Employee</h2>
        <Link to="/employees" className="btn btn-outline-secondary">Back</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <EmployeeForm
            formData={formData}
            errors={errors}
            departments={departments}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Update Employee"
          />
        </div>
      </div>
    </div>
  );
}
