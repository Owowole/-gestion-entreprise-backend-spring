import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { departmentService } from '../services/api';

function DepartmentForm() {
  const [department, setDepartment] = useState({
    nom: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const fetchDepartment = async () => {
    try {
      const response = await departmentService.getAll();
      const foundDepartment = response.data.find(dept => dept.id === parseInt(id));
      if (foundDepartment) {
        setDepartment(foundDepartment);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du département', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await departmentService.update(id, department);
      } else {
        await departmentService.create(department);
      }
      navigate('/departments');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {id ? "Modifier un Département" : "Ajouter un Département"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              placeholder="Nom du département"
              className="input input-bordered"
              value={department.nom}
              onChange={(e) =>
                setDepartment({ ...department, nom: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Description du département"
              className="textarea textarea-bordered"
              value={department.description}
              onChange={(e) =>
                setDepartment({ ...department, description: e.target.value })
              }
            />
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/departments")}
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

export default DepartmentForm; 