package com.esmt.sn.gestion.controller;

import com.esmt.sn.gestion.models.Department;
import com.esmt.sn.gestion.models.Employee;
import com.esmt.sn.gestion.repository.EmployeeRepository;
import com.esmt.sn.gestion.service.DepartmentService;
import com.esmt.sn.gestion.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*") // Permet les requêtes cross-origin (utile si frontend séparé)
public class EmployeeController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeService employeeService, DepartmentService departmentService, EmployeeRepository employeeRepository) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.employeeRepository = employeeRepository;
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(employee));
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }
    @PutMapping("/{employeeId}/assign-department/{departmentId}")
    public ResponseEntity<Employee> assignDepartment(
            @PathVariable Long employeeId,
            @PathVariable Long departmentId) {

        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee == null) {
            throw  new RuntimeException("Employé non trouvé");
        }

        Department department = departmentService.getDepartmentById(departmentId);
        if (department == null) {
            throw  new RuntimeException("Département non trouvé");
        }

        employee.setDepartment(department);
        employeeRepository.save(employee);

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String prenom,
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) Long departmentId) {
        return ResponseEntity.ok(employeeService.searchEmployees(nom, role, prenom, departmentId));
    }
}
