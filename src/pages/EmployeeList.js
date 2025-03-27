// Fichier: src/pages/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeService, departmentService } from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    nom: '',
    prenom: '', 
    departmentId: '',
    role: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des départements', error);
    }
  };

  const handleSearch = async () => {
    try {
      // Filtrer les critères de recherche vides
      const criteria = Object.fromEntries(
        Object.entries(searchCriteria).filter(([_, v]) => v !== '')
      );
      
      if (Object.keys(criteria).length === 0) {
        fetchEmployees();
        return;
      }

      const response = await employeeService.search(criteria);
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await employeeService.delete(id);
      fetchEmployees();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleReset = () => {
    setSearchCriteria({
      nom: '',
      prenom: '',
      departmentId: '',
      role: ''
    });
    fetchEmployees();
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Liste des Employés</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Nom" 
            className="input input-bordered"
            value={searchCriteria.nom}
            onChange={(e) => setSearchCriteria({...searchCriteria, nom: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Prénom" 
            className="input input-bordered"
            value={searchCriteria.prenom}
            onChange={(e) => setSearchCriteria({...searchCriteria, prenom: e.target.value})}
          />
          
          <select
            className="select select-bordered"
            value={searchCriteria.departmentId}
            onChange={(e) => setSearchCriteria({...searchCriteria, departmentId: e.target.value})}
          >
            <option value="">Tous les départements</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.nom}
              </option>
            ))}
          </select>
          
          <input 
            type="text" 
            placeholder="Rôle" 
            className="input input-bordered"
            value={searchCriteria.role}
            onChange={(e) => setSearchCriteria({...searchCriteria, role: e.target.value})}
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button 
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Rechercher
          </button>
          <button 
            className="btn btn-ghost"
            onClick={handleReset}
          >
            Réinitialiser
          </button>
          <Link 
            to="/employees/new" 
            className="btn btn-success ml-auto"
          >
            Ajouter un employé
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Département</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.nom}</td>
                  <td>{employee.prenom}</td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.department ? employee.department.nom : 'Non assigné'}
                  </td>
                  <td>{employee.role}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        to={`/employees/edit/${employee.id}`} 
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Modifier
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(employee.id)}
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

        {employees.length === 0 && (
          <div className="alert alert-info mt-4">
            Aucun employé trouvé
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;