package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Employee;
import com.esmt.sn.gestion.models.Project;
import com.esmt.sn.gestion.repository.EmployeeRepository;
import com.esmt.sn.gestion.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, EmployeeRepository employeeRepository) {
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));

        project.setNom(projectDetails.getNom());
        project.setDescription(projectDetails.getDescription());
        project.setDateDebut(projectDetails.getDateDebut());
        project.setDateFin(projectDetails.getDateFin());
        project.setStatut(projectDetails.getStatut());

        return projectRepository.save(project);
    }


    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));
    }


    @Override
    public void assignEmployeeToProject(Long projectId, Long employeeId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));
        projectRepository.save(project);
    }
}
