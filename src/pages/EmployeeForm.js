// Fichier: src/pages/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeService, departmentService } from '../services/api';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    nom: '',
    prenom: '',
    email: '',
    department: {
        id: ''
    },
    role: ''
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDepartments();
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAll();
      setDepartments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des départements', error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await employeeService.getAll();
      const foundEmployee = response.data.find(emp => emp.id === parseInt(id));
      if (foundEmployee) {
        setEmployee(foundEmployee);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'employé', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await employeeService.update(id, employee);
      } else {
        await employeeService.create(employee);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {id ? "Modifier un Employé" : "Ajouter un Employé"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              placeholder="Nom"
              className="input input-bordered"
              value={employee.nom}
              onChange={(e) =>
                setEmployee({ ...employee, nom: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Prénom</span>
            </label>
            <input
              type="text"
              placeholder="Prénom"
              className="input input-bordered"
              value={employee.prenom}
              onChange={(e) =>
                setEmployee({ ...employee, prenom: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Département</span>
            </label>
            <select
              className="select select-bordered"
              value={employee.department?.id || ""}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  department: { ...employee.department, id: e.target.value },
                })
              }
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Rôle</span>
            </label>
            <input
              type="text"
              placeholder="Rôle"
              className="input input-bordered"
              value={employee.role}
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
              required
            />
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/employees")}
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

export default EmployeeForm;