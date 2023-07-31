import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, setCurrentPage } from "../redux/action";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Import the CSS file for the component

export const HomePage = () => {
  const dispatch = useDispatch();
  const { countries, loading, error, currentPage, countriesPerPage } =
    useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const totalCountries = countries.length;
  const lastPage = Math.ceil(totalCountries / countriesPerPage);

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentCountries = countries.slice(
    (currentPage - 1) * countriesPerPage,
    currentPage * countriesPerPage
  );

  return (
    <div>
      <h1>Listado de países</h1>
      <div className="country-list">
        {currentCountries.length === 0 ? (
          <div>No hay países disponibles.</div>
        ) : (
          currentCountries.map((country) => (
            <Link key={country.id} to={`/detail/${country.id}`}>
              <div className="country-card">
                <img
                  className="img"
                  src={country.imagen}
                  alt={country.nombre}
                />
                <h3>{country.nombre}</h3>
                <p>Continente: {country.continente}</p>
                <p>Población: {country.poblacion}</p>
                <p>Area: {country.area}</p>

                <h4>Actividades:</h4>
                {country.Activities.length === 0 ? (
                  <div>No hay actividades disponibles.</div>
                ) : (
                  <ul>
                    {country.Activities.map((activity) => (
                      <li key={activity.id}>{activity.nombre}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Atrás
        </button>
        <button onClick={handleNextPage} disabled={currentPage === lastPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
