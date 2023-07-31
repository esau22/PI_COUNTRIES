import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterContinent,
  sortCountries,
  filterActivity,
  fetchActivity,
} from "../redux/action";
import "../styles/Filter.css";

export const Filter = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { activities, countries } = useSelector((s) => s);
  const originalCountries = [...countries];
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  const handleContinentFilter = (event) => {
    event.preventDefault();
    dispatch(filterContinent(selectedContinent));
  };

  const handleActivityFilter = (event) => {
    event.preventDefault();
    dispatch(filterActivity(selectedActivity));
  };

  const handleSort = (sortByOption) => {
    if (sortByOption === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
    }
    setSortBy(sortByOption);
    dispatch(
      sortCountries(
        sortByOption,
        sortOrder,
        selectedContinent,
        selectedActivity
      )
    );
  };

  const getUniqueContinents = () => {
    const continentSet = new Set();
    originalCountries.forEach((country) => {
      continentSet.add(country.continente);
    });
    return Array.from(continentSet);
  };

  return (
    <div className="filter-container">
      <select
        value={selectedContinent}
        onChange={(e) => setSelectedContinent(e.target.value)}
      >
        <option value="">Selecciona un continente</option>
        {getUniqueContinents().map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      <button onClick={handleContinentFilter}>Buscar</button>
      <select
        value={selectedActivity}
        onChange={(e) => setSelectedActivity(e.target.value)}
      >
        <option value="">Selecciona una actividad</option>
        {activities.map((acti) => (
          <option key={acti.id} value={acti.nombre}>
            {acti.nombre}
          </option>
        ))}
      </select>
      <button onClick={handleActivityFilter}>Buscar</button>

      <button onClick={() => handleSort("alphabet")}>
        Ordenar por Alfabeto{" "}
        {sortBy === "alphabet" && sortOrder === "asc" && "(Asc)"}
        {sortBy === "alphabet" && sortOrder === "desc" && "(Desc)"}
      </button>

      <button onClick={() => handleSort("poblacion")}>
        Ordenar por Poblacion{" "}
        {sortBy === "poblacion" && sortOrder === "asc" && "(Asc)"}
        {sortBy === "poblacion" && sortOrder === "desc" && "(Desc)"}
      </button>
    </div>
  );
};
