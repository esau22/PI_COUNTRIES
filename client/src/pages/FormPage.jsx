import React, { useState } from "react";
import "../styles/FormPage.css";

export default function FormPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaisesChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prevData) => ({
      ...prevData,
      paises: selectedOptions,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar alguna acción con ellos
    console.log(formData);
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>crear actividad turística</h2>
        <div className="inputs">
          <label>Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />

          <label>Dificultad:</label>
          <input
            type="text"
            id="dificultad"
            name="dificultad"
            value={formData.dificultad}
            onChange={handleInputChange}
          />

          <label>Duración:</label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            value={formData.duracion}
            onChange={handleInputChange}
          />
          <label>Temporada:</label>
          <input
            type="text"
            id="temporada"
            name="temporada"
            value={formData.temporada}
            onChange={handleInputChange}
          />
          <label>Países:</label>
          <div class="custom-combo-box">
            <div class="selected-option">Select an option</div>
            <div class="options">
              <div class="option">Option 1</div>
              <div class="option">Option 2</div>
              <div class="option">Option 3</div>
            </div>
          </div>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
