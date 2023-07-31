import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/DetailPage.css";

export const DetailPage = () => {
  const { id } = useParams(); // Get the country code from the URL parameter

  const countries = useSelector((state) => state.countries);

  const country = countries.find((country) => country.id === id);

  if (!country) {
    return <div className="country-not-found">Country not found.</div>;
  }

  return (
    <div className="country-details">
      <div className="country-image">
        <img src={country.imagen} alt={country.id} />
      </div>
      <div className="country-info">
        <h1>{country.nombre}</h1>
        <p>
          <strong>ID:</strong> {country.id}
        </p>
        <p>
          <strong>Continente:</strong> {country.continente}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Población:</strong> {country.poblacion}
        </p>
        <p>
          <strong>SubRegión:</strong> {country.subregion}
        </p>
        <p>
          <strong>Área:</strong> {country.area}
        </p>
        {/* Add other details you want to display about the country */}
      </div>
    </div>
  );
};
