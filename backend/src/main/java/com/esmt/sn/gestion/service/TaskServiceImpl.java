package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Employee;
import com.esmt.sn.gestion.models.Project;
import com.esmt.sn.gestion.models.Task;
import com.esmt.sn.gestion.repository.EmployeeRepository;
import com.esmt.sn.gestion.repository.ProjectRepository;
import com.esmt.sn.gestion.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public TaskServiceImpl(TaskRepository taskRepository, EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }
    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tâche non trouvée"));

        task.setDescription(taskDetails.getDescription());
        task.setStatut(taskDetails.getStatut());

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long id, String statut) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tâche non trouvée"));
        task.setStatut(statut);
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tâche non trouvée"));
    }

    @Override
    public List<Task> findByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public void assignTaskToEmployee(Long taskId, Long employeeId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tâche non trouvée"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        task.setEmployee(employee);
        taskRepository.save(task);
    }
}
