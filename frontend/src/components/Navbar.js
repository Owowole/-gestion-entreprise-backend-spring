import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">Gestion RH</Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/employees">Employés</Link></li>
          <li><Link to="/departments">Départements</Link></li>
          <li><Link to="/projects">Projets</Link></li>
          <li><Link to="/tasks">Tâches</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;