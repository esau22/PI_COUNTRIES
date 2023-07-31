import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Filter } from "./Filter";
import "../styles/NavBar.css";

export const NavBar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.png" alt="Logo" />
          <span>Nombre de la App</span>
        </div>
        <div className="navbar-links">
          <Link to="/home">Home</Link>
          <Link to="/create">Crear Actividad</Link>
        </div>
        <div className="navbar-controls">
          <SearchBar />
          <Filter />
          <Link to="/">
            <button>Cerrar Sesion</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
