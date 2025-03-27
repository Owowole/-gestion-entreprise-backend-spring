// Fichier: src/services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // URL de votre API Spring Boot

export const employeeService = {
  getAll: () => axios.get(`${BASE_URL}/employees`),
  create: (employee) => axios.post(`${BASE_URL}/employees`, employee),
  update: (id, employee) => axios.put(`${BASE_URL}/employees/${id}`, employee),
  delete: (id) => axios.delete(`${BASE_URL}/employees/${id}`),
  search: (criteria) =>
    axios.get(`${BASE_URL}/employees/search`, { params: criteria }),
};

export const departmentService = {
  getAll: () => axios.get(`${BASE_URL}/departments`),
  create: (department) => axios.post(`${BASE_URL}/departments`, department),
  update: (id, department) =>
    axios.put(`${BASE_URL}/departments/${id}`, department),
  delete: (id) => axios.delete(`${BASE_URL}/departments/${id}`),
};

export const projectService = {
  getAll: () => axios.get(`${BASE_URL}/projects`),
  create: (project) => axios.post(`${BASE_URL}/projects`, project),
  update: (id, project) => axios.put(`${BASE_URL}/projects/${id}`, project),
  delete: (id) => axios.delete(`${BASE_URL}/projects/${id}`),
  assignEmployee: (projectId, employeeId) =>
    axios.post(`${BASE_URL}/projects/${projectId}/assign/${employeeId}`),
};

export const taskService = {
  getAll: () => axios.get(`${BASE_URL}/tasks`),
  create: (task) => axios.post(`${BASE_URL}/tasks`, task),
  update: (id, task) => axios.put(`${BASE_URL}/tasks/${id}`, task),
  delete: (id) => axios.delete(`${BASE_URL}/tasks/${id}`),
  getByEmployee: (employeeId) =>
    axios.get(`${BASE_URL}/tasks/employee/${employeeId}`),
  getByProject: (projectId) =>
    axios.get(`${BASE_URL}/tasks/project/${projectId}`),
};
