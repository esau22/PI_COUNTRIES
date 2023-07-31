import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, fetchActivity } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";

export const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activities, countries } = useSelector((s) => s);

  const [inputs, setInputs] = useState({
    id: "",
    nombre: "",
    dificultad: "",
    temporada: "",
    duracion: "",
    nameCountry: [],
  });

  const [errorInputs, setErrorInputs] = useState({
    nombre: "",
    dificultad: "",
    temporada: "",
    duracion: "",
    nameCountry: [],
  });

  const validateInputs = (inputs) => {
    const errors = {};

    // Validar que el nombre no esté vacío
    if (!inputs.nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    }

    // Validar que la dificultad sea un número entre 1 y 5
    if (
      isNaN(inputs.dificultad) ||
      inputs.dificultad < 1 ||
      inputs.dificultad > 5
    ) {
      errors.dificultad = "La dificultad debe ser un número entre 1 y 5";
    }

    // Validar que la temporada esté seleccionada
    if (!inputs.temporada) {
      errors.temporada = "Selecciona una temporada";
    }

    // Validar que la duración sea un número positivo
    if (isNaN(inputs.duracion) || inputs.duracion <= 0) {
      errors.duracion = "La duración debe ser un número positivo";
    }

    // Validar que al menos un país esté seleccionado/agregado
    if (inputs.nameCountry.length === 0) {
      errors.nameCountry = "Selecciona/agrega al menos un país";
    }

    return errors;
  };

  const handleAddCountry = function () {
    if (inputs.nameCountry) {
      setInputs({
        ...inputs,
        nameCountry: [...inputs.nameCountry, inputs.selectedCountry],
        selectedCountry: "", // Reset the selectedCountry value after adding
      });
    }
  };

  const handleRemoveCountry = function (index) {
    const updatedCountries = [...inputs.nameCountry];
    updatedCountries.splice(index, 1);
    setInputs({
      ...inputs,
      nameCountry: updatedCountries,
    });
  };

  const handleChange = function (event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    const errors = validateInputs(inputs);
    setErrorInputs(errors);

    // Si hay errores, detener el envío del formulario
    if (Object.keys(errors).length > 0) {
      return;
    }

    const existingActivity = activities?.find(
      (act) => act.nombre === inputs.nombre
    );
    if (existingActivity) {
      return alert(`La actividad "${inputs.nombre}" ya existe.`);
    }
    dispatch(createActivity(inputs));
    alert("Actividad creada");
    setInputs({
      id: "",
      nombre: "",
      dificultad: "",
      temporada: "",
      duracion: "",
      nameCountry: [],
    });
    navigate("/home");
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={inputs.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dificultad">Dificultad:</label>
        <input
          type="number"
          id="dificultad"
          name="dificultad"
          value={inputs.dificultad}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duracion">Duración (en horas):</label>
        <input
          type="number"
          id="duracion"
          name="duracion"
          value={inputs.duracion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="temporada">Temporada:</label>
        <select
          id="temporada"
          name="temporada"
          value={inputs.temporada}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="nameCountry">Países:</label>
        <select
          id="nameCountry"
          name="selectedCountry"
          value={inputs.selectedCountry}
          onChange={handleChange}
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.nombre}>
              {country.nombre}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddCountry} // Add selected country to the list
          disabled={!inputs.selectedCountry}
        >
          Agregar País
        </button>
      </div>

      {/* Display the list of selected countries */}
      <div className="selected-countries">
        {inputs.nameCountry.map((country, index) => (
          <div key={index} className="selected-country">
            <span>{country}</span>
            <button
              type="button"
              onClick={() => handleRemoveCountry(index)} // Remove the country from the list
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="submit-button">
        Crear Actividad Turística
      </button>
    </form>
  );
};
