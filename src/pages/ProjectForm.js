import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../services/api';

function ProjectForm() {
  const [project, setProject] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: 'EN_COURS'
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectService.getAll();
      const foundProject = response.data.find(proj => proj.id === parseInt(id));
      if (foundProject) {
        setProject(foundProject);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du projet', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await projectService.update(id, project);
      } else {
        await projectService.create(project);
      }
      navigate('/projects');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {id ? "Modifier un Projet" : "Ajouter un Projet"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              placeholder="Nom du projet"
              className="input input-bordered"
              value={project.nom}
              onChange={(e) =>
                setProject({ ...project, nom: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Description du projet"
              className="textarea textarea-bordered"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Statut</span>
            </label>
            <select
              className="select select-bordered"
              value={project.statut}
              onChange={(e) =>
                setProject({ ...project, statut: e.target.value })
              }
            >
              <option value="EN_COURS">En cours</option>
              <option value="TERMINE">Terminé</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date de début</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={project.dateDebut}
                onChange={(e) =>
                  setProject({ ...project, dateDebut: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date de fin</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={project.dateFin}
                onChange={(e) =>
                  setProject({ ...project, dateFin: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/projects")}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {id ? "Mettre à jour" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm; 