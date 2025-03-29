package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Project;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project);
    Project updateProject(Long id, Project project);
    void deleteProject(Long id);
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    void assignEmployeeToProject(Long projectId, Long employeeId);
}
