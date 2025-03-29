package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Department;

import java.util.List;

public interface DepartmentService {
    Department createDepartment(Department department);
    Department updateDepartment(Long id, Department department);
    void deleteDepartment(Long id);
    List<Department> getAllDepartments();
    Department getDepartmentById(Long id);
}

