package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Employee;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    List<Employee> searchEmployees(String name, String role, String prenom, Long departmentId);
}
