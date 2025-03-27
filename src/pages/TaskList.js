// Fichier: src/pages/TaskList.js
import React, { useState, useEffect } from 'react';
import { taskService, employeeService, projectService } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    employee: {
        id : ''
    },
    project: {
        id: ''
    },
    statut: 'A_FAIRE'
  });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await taskService.create(newTask);
      fetchTasks();
      setNewTask({
        description: '',
        employee: {
            id : ''
        },
        project: {
            id: ''
        },
        statut: 'A_FAIRE'
      });
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.delete(id);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await taskService.update(task.id, { statut: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Gestion des Tâches</h2>
        
        <form onSubmit={handleCreate} className="space-y-4">
          <textarea 
            placeholder="Description de la tâche" 
            className="textarea textarea-bordered w-full"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <select
              className="select select-bordered"
              value={newTask.employee_id}
              onChange={(e) => setNewTask({...newTask, 
                employee: { id: e.target.value }})}
              required
            >
              <option value="">Sélectionner un employé</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.prenom} {emp.nom}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={newTask.projet_id}
              onChange={(e) => setNewTask({...newTask, ...newTask, 
                project: { id: e.target.value }})}
              required
            >
              <option value="">Sélectionner un projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.nom}
                </option>
              ))}
            </select>
          </div>

          <select
            className="select select-bordered w-full"
            value={newTask.statut}
            onChange={(e) => setNewTask({...newTask, statut: e.target.value})}
          >
            <option value="A_FAIRE">À faire</option>
            <option value="EN_COURS">En cours</option>
            <option value="TERMINEE">Terminée</option>
          </select>

          <button type="submit" className="btn btn-primary w-full">
            Créer une tâche
          </button>
        </form>

        <div className="divider"></div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Description</th>
                <th>Employé</th>
                <th>Projet</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.description}</td>
                  <td>{task.employee?.prenom} {task.employee?.nom}</td>
                  <td>{task.project?.nom}</td>
                  <td>
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className={`btn btn-sm ${
                        task.statut === 'A_FAIRE' ? 'btn-warning' :
                        task.statut === 'EN_COURS' ? 'btn-info' :
                        'btn-success'
                      }`}>
                        {task.statut === 'A_FAIRE' ? 'À faire' :
                         task.statut === 'EN_COURS' ? 'En cours' :
                         'Terminée'}
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {task.statut !== 'A_FAIRE' && (
                          <li>
                            <a onClick={() => handleStatusChange(task, 'A_FAIRE')}>
                              Marquer comme À faire
                            </a>
                          </li>
                        )}
                        {task.statut !== 'EN_COURS' && (
                          <li>
                            <a onClick={() => handleStatusChange(task, 'EN_COURS')}>
                              Marquer comme En cours
                            </a>
                          </li>
                        )}
                        {task.statut !== 'TERMINEE' && (
                          <li>
                            <a onClick={() => handleStatusChange(task, 'TERMINEE')}>
                              Marquer comme Terminée
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(task.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskList;