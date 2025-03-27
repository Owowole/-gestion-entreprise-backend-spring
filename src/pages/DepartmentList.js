// Fichier: src/pages/DepartmentList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService } from '../services/api';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des départements', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await departmentService.delete(id);
      fetchDepartments();
    } catch (error) {
      console.error('Erreur lors de la suppression du département', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Gestion des Départements</h2>
          <Link 
            to="/departments/new" 
            className="btn btn-primary"
          >
            Nouveau Département
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.nom}</td>
                  <td>{dept.description}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        to={`/departments/edit/${dept.id}`} 
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Modifier
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(dept.id)}
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

export default DepartmentList;