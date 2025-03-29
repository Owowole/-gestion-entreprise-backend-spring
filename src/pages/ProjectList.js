// Fichier: src/pages/ProjectList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService, employeeService, taskService } from '../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectTasks, setProjectTasks] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Fetch tasks for each project when projects change
    if (projects.length > 0) {
      projects.forEach(project => {
        fetchProjectTasks(project.id);
      });
    }
  }, [projects]);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets', error);
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

  const fetchProjectTasks = async (projectId) => {
    try {
      const response = await taskService.getByProject(projectId);
      setProjectTasks(prev => ({
        ...prev,
        [projectId]: response.data
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches du projet', error);
    }
  };

  const calculateProjectProgress = (projectId) => {
    const tasks = projectTasks[projectId] || [];
    if (tasks.length === 0) return 0;

    const completedTasks = tasks.filter(task => task.statut === 'TERMINEE').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getTaskStatusCount = (projectId) => {
    const tasks = projectTasks[projectId] || [];
    return {
      total: tasks.length,
      todo: tasks.filter(task => task.statut === 'A_FAIRE').length,
      inProgress: tasks.filter(task => task.statut === 'EN_COURS').length,
      completed: tasks.filter(task => task.statut === 'TERMINEE').length
    };
  };

  const handleDelete = async (id) => {
    try {
      await projectService.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet', error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'A_FAIRE':
        return 'badge-warning';
      case 'EN_COURS':
        return 'badge-info';
      case 'TERMINEE':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'A_FAIRE':
        return 'À faire';
      case 'EN_COURS':
        return 'En cours';
      case 'TERMINEE':
        return 'Terminée';
      default:
        return status;
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Gestion des Projets</h2>
          <Link 
            to="/projects/new" 
            className="btn btn-primary"
          >
            Nouveau Projet
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const progress = calculateProjectProgress(project.id);
            const taskStats = getTaskStatusCount(project.id);
            
            return (
              <div key={project.id} className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">{project.nom}</h3>
                  <p className="text-sm opacity-70">{project.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progression</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full" 
                      value={progress} 
                      max="100"
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Date de début:</span>
                      <span>{new Date(project.dateDebut).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Date de fin:</span>
                      <span>{new Date(project.dateFin).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="stats shadow mt-4">
                    <div className="stat">
                      <div className="stat-title">Total</div>
                      <div className="stat-value">{taskStats.total}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">À faire</div>
                      <div className="stat-value text-warning">{taskStats.todo}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">En cours</div>
                      <div className="stat-value text-info">{taskStats.inProgress}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Terminées</div>
                      <div className="stat-value text-success">{taskStats.completed}</div>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => setSelectedProject(project)}
                    >
                      Voir les tâches
                    </button>
                    <Link 
                      to={`/projects/edit/${project.id}`} 
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Modifier
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(project.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProject && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg mb-4">
                Tâches du projet {selectedProject.nom}
              </h3>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Employé</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectTasks[selectedProject.id]?.map((task) => (
                      <tr key={task.id}>
                        <td>{task.description}</td>
                        <td>{task.employee?.prenom} {task.employee?.nom}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeColor(task.statut)}`}>
                            {getStatusText(task.statut)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectList;