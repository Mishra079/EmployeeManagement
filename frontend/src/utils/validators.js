export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[+]?[0-9]{10,15}$/.test(phone);
}

export function validateEmployeeCode(code) {
  return /^[A-Z0-9-]+$/.test(code);
}

export function validateEmployeeForm(data) {
  const errors = {};

  if (!data.employeeCode?.trim()) errors.employeeCode = 'Employee code is required';
  else if (!validateEmployeeCode(data.employeeCode))
    errors.employeeCode = 'Use uppercase letters, numbers, and hyphens only';

  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';

  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email format';

  if (data.phone && !validatePhone(data.phone))
    errors.phone = 'Phone must be 10-15 digits';

  if (!data.departmentId) errors.departmentId = 'Department is required';
  if (!data.designation?.trim()) errors.designation = 'Designation is required';
  if (!data.salary || data.salary <= 0) errors.salary = 'Salary must be positive';
  if (!data.status) errors.status = 'Status is required';

  return errors;
}

export function validateDepartmentForm(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Department name is required';
  else if (data.name.length < 2) errors.name = 'Name must be at least 2 characters';
  return errors;
}
