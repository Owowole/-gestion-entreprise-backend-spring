// Fichier: src/pages/ProjectList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService, employeeService } from '../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newProject, setNewProject] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: 'EN_COURS'
  });
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const createdProject = await projectService.create(newProject);
      
      // Si un employé est sélectionné, l'assigner au projet
      if (selectedEmployee) {
        await projectService.assignEmployee(createdProject.data.id, selectedEmployee);
      }

      fetchProjects();
      setNewProject({
        nom: '',
        description: '',
        date_début: '',
        date_fin: '',
        statut: 'EN_COURS'
      });
      setSelectedEmployee('');
    } catch (error) {
      console.error('Erreur lors de la création du projet', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectService.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Gestion des Projets</h2>
        
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nom du projet" 
              className="input input-bordered"
              value={newProject.nom}
              onChange={(e) => setNewProject({...newProject, nom: e.target.value})}
              required
            />
            <select
              className="select select-bordered"
              value={newProject.statut}
              onChange={(e) => setNewProject({...newProject, statut: e.target.value})}
            >
              <option value="EN_COURS">En cours</option>
              <option value="TERMINE">Terminé</option>
            </select>
          </div>
          
          <textarea 
            placeholder="Description du projet" 
            className="textarea textarea-bordered w-full"
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Date de début</label>
              <input 
                type="date" 
                className="input input-bordered"
                value={newProject.date_début}
                onChange={(e) => setNewProject({...newProject, dateDebut: e.target.value})}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Date de fin</label>
              <input 
                type="date" 
                className="input input-bordered"
                value={newProject.dateFin}
                onChange={(e) => setNewProject({...newProject, dateFin: e.target.value})}
                required
              />
            </div>
          </div>

     
          <button type="submit" className="btn btn-primary w-full">
            Créer un projet
          </button>
        </form>

        <div className="divider"></div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.nom}</td>
                  <td>{project.description}</td>
                  <td>
                    <span className={`badge ${project.statut === 'TERMINE' ? 'badge-success' : 'badge-warning'}`}>
                      {project.statut === 'EN_COURS' ? 'En cours' : 'Terminé'}
                    </span>
                  </td>
                  <td>{project.dateDebut}</td>
                  <td>{project.dateFin}</td>
                  <td>
                    <div className="flex gap-2">
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

export default ProjectList;