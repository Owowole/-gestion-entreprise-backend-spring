package com.esmt.sn.gestion.repository;

import com.esmt.sn.gestion.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByNomContainingIgnoreCase(String nom);
    List<Employee> findByRole(String role);

    @Query("SELECT e FROM Employee e WHERE " +
            "(:nom IS NULL OR LOWER(e.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:prenom IS NULL OR LOWER(e.prenom) LIKE LOWER(CONCAT('%', :prenom, '%'))) AND " +
            "(:role IS NULL OR e.role = :role) AND " +
            "(:departmentId IS NULL OR e.department.id = :departmentId)")
    List<Employee> findByCriteria(@Param("nom") String nom,
                                  @Param("role") String role,
                                  @Param("prenom") String prenom,
                                  @Param("departmentId") Long departmentId);
}

