import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="landing-page">
      <h1>Bienvenido a la LandingPage</h1>
      <label>
        Ingresa tu nombre de usuario:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label>
        Ingresa tu contraseña:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      {/* Utiliza el componente Link para redirigir al usuario al hacer clic en el botón */}
      <Link to="/home">
        <button>Ingresar al Home</button>
      </Link>
    </div>
  );
};
