export default function EmployeeForm({ formData, errors, departments, onChange, onSubmit, submitting, submitLabel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, name === 'departmentId' || name === 'salary' ? Number(value) || value : value);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Employee Code *</label>
          <input
            type="text"
            name="employeeCode"
            className={`form-control ${errors.employeeCode ? 'is-invalid' : ''}`}
            value={formData.employeeCode}
            onChange={handleChange}
            placeholder="EMP-001"
          />
          {errors.employeeCode && <div className="invalid-feedback">{errors.employeeCode}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            name="lastName"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Gender</label>
          <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Date of Birth</label>
          <input type="date" name="dateOfBirth" className="form-control" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Joining Date</label>
          <input type="date" name="joiningDate" className="form-control" value={formData.joiningDate} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Department *</label>
          <select
            name="departmentId"
            className={`form-select ${errors.departmentId ? 'is-invalid' : ''}`}
            value={formData.departmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.departmentId && <div className="invalid-feedback">{errors.departmentId}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Designation *</label>
          <input
            type="text"
            name="designation"
            className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
            value={formData.designation}
            onChange={handleChange}
          />
          {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Salary *</label>
          <input
            type="number"
            name="salary"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            value={formData.salary}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Status *</label>
          <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <div className="col-md-8">
          <label className="form-label">Profile Image URL</label>
          <input type="url" name="profileImage" className="form-control" value={formData.profileImage} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">State</label>
          <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Country</label>
          <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Zip Code</label>
          <input type="text" name="zipCode" className="form-control" value={formData.zipCode} onChange={handleChange} />
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
