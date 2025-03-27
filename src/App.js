import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList.js';
import EmployeeForm from './pages/EmployeeForm.js';
import DepartmentList from './pages/DepartmentList.js';
import DepartmentForm from './pages/DepartmentForm.js';
import ProjectList from './pages/ProjectList.js';
import TaskList from './pages/TaskList.js';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/new" element={<DepartmentForm />} />
            <Route path="/departments/edit/:id" element={<DepartmentForm />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
