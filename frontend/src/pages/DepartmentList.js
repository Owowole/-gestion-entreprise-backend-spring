// Fichier: src/pages/DepartmentList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService, employeeService } from '../services/api';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des départements', error);
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

  const handleDelete = async (id) => {
    try {
      await departmentService.delete(id);
      fetchDepartments();
    } catch (error) {
      console.error('Erreur lors de la suppression du département', error);
    }
  };

  const handleAssignEmployee = async (departmentId) => {
    if (!selectedEmployee) {
      alert('Veuillez sélectionner un employé');
      return;
    }

    try {
      await employeeService.assignDepartment(selectedEmployee, departmentId);
      fetchEmployees();
      setSelectedEmployee('');
      setSelectedDepartment(null);
    } catch (error) {
      console.error('Erreur lors de l\'assignation de l\'employé', error);
      alert('Erreur lors de l\'assignation de l\'employé');
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
                      <button
                        className="btn btn-sm btn-outline btn-success"
                        onClick={() => setSelectedDepartment(dept)}
                      >
                        Assigner un employé
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedDepartment && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Assigner un employé au département {selectedDepartment.nom}
              </h3>
              <select
                className="select select-bordered w-full mb-4"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Sélectionner un employé</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.prenom} {emp.nom}
                  </option>
                ))}
              </select>
              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSelectedEmployee('');
                  }}
                >
                  Annuler
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssignEmployee(selectedDepartment.id)}
                >
                  Assigner
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentList;