import api from './api';

const employeeService = {
  getAll: (params) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
  search: (keyword, params) =>
    api.get('/employees/search', { params: { keyword, ...params } }),
  filter: (filters, params) =>
    api.get('/employees/filter', { params: { ...filters, ...params } }),
};

export default employeeService;
