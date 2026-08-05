import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import departmentService from '../services/departmentService';
import employeeService from '../services/employeeService';
import { validateEmployeeForm } from '../utils/validators';
import { showSuccess, showError } from '../hooks/useToast';

const initialForm = {
  employeeCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  departmentId: '',
  designation: '',
  salary: '',
  joiningDate: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  status: 'ACTIVE',
  profileImage: '',
};

export default function AddEmployee() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    departmentService.getAll().then(({ data }) => setDepartments(data)).catch(() => {});
  }, []);

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
      await employeeService.create(formData);
      showSuccess('Employee created successfully');
      navigate('/employees');
    } catch (err) {
      showError(err.message || 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Add Employee</h2>
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
            submitLabel="Create Employee"
          />
        </div>
      </div>
    </div>
  );
}
