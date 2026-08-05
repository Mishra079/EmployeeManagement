import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, MainLayout } from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import EmployeeDetails from '../pages/EmployeeDetails';
import AddEmployee from '../pages/AddEmployee';
import EditEmployee from '../pages/EditEmployee';
import Departments from '../pages/Departments';
import AddDepartment from '../pages/AddDepartment';
import EditDepartment from '../pages/EditDepartment';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/:id/edit" element={<EditDepartment />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
