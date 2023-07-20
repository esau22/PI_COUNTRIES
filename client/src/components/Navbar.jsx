import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar">
      <div className="nav_loogo"> emr </div>
      <div className={`nav_items ${isOpen ? "open" : ""} `}>
        <Link to="/home" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/create" onClick={handleLinkClick}>
          Create
        </Link>
        <Link to="/detail/:id" onClick={handleLinkClick}>
          Detail
        </Link>
        <Link to="/buscar" onClick={handleLinkClick}>
          Buscar
        </Link>
      </div>
      <div
        className={`nav_toggle ${isOpen ? "open" : ""} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
