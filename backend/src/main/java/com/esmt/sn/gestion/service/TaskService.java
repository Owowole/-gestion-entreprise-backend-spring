package com.esmt.sn.gestion.service;

import com.esmt.sn.gestion.models.Task;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
    List<Task> getAllTasks();
    public Task updateTaskStatus(Long id, String statut);
    Task getTaskById(Long id);
    List<Task> findByProjectId(Long projectId);
    void assignTaskToEmployee(Long taskId, Long employeeId);
}

