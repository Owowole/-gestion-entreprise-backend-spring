package com.esmt.sn.gestion.controller;
import com.esmt.sn.gestion.models.Task;

import com.esmt.sn.gestion.repository.TaskRepository;
import com.esmt.sn.gestion.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskRepository taskRepository;

    public TaskController(TaskService taskService, TaskRepository taskRepository) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(task));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/by-project/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Long projectId) {
        List<Task> tasks = taskService.findByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        Optional<Task> taskOptional = Optional.ofNullable(taskService.getTaskById(id));
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();

            // Update only the status field
            String newStatus = statusUpdate.get("statut");
            taskService.updateTaskStatus(id, newStatus); // Save the updated task
            return ResponseEntity.ok(task);  // Return the updated task
        } else {
            return ResponseEntity.notFound().build();  // Task not found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{taskId}/assign/{employeeId}")
    public ResponseEntity<Void> assignTaskToEmployee(@PathVariable Long taskId, @PathVariable Long employeeId) {
        taskService.assignTaskToEmployee(taskId, employeeId);
        return ResponseEntity.ok().build();
    }
}
