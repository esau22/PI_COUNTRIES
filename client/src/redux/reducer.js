// reducers.js

import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  CREATE_ACTIVITY,
  SET_CURRENT_PAGE,
  SORT_COUNTRIES,
  FETCH_ACT,
} from "./actionType";

const initialState = {
  countries: [],
  activity: [],
  activities: [],
  loading: false,
  error: null,
  currentPage: 1,
  countriesPerPage: 10,
  sortBy: "", // The selected sorting option ("alphabet" or "population")
  sortOrder: "",
};

const sectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activity: [...state.activity, action.payload],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SORT_COUNTRIES:
      const { sortBy, sortOrder, filterTerm, activityTerm } = action.payload;
      const countries = [...state.countries];

      // Aplicamos el filtro primero si hay un término de filtro seleccionado
      const filteredCountries = filterTerm
        ? countries.filter((country) =>
            country.continente.toLowerCase().includes(filterTerm.toLowerCase())
          )
        : countries;

      // Luego, aplicamos el filtro por actividad si hay un término de actividad seleccionado
      const filteredCountriesByActivity = activityTerm
        ? filteredCountries.filter((country) =>
            country.Activities.some((activity) =>
              activity.nombre.toLowerCase().includes(activityTerm.toLowerCase())
            )
          )
        : filteredCountries;

      // Luego, aplicamos la clasificación según la opción de clasificación seleccionada y el orden
      const sortedCountries = [...filteredCountriesByActivity];

      if (sortBy === "alphabet") {
        sortedCountries.sort((a, b) =>
          sortOrder === "asc"
            ? a.nombre.localeCompare(b.nombre)
            : b.nombre.localeCompare(a.nombre)
        );
      } else if (sortBy === "poblacion") {
        sortedCountries.sort((a, b) =>
          sortOrder === "asc"
            ? a.poblacion - b.poblacion
            : b.poblacion - a.poblacion
        );
      }

      return {
        ...state,
        countries: sortedCountries,
        sortBy,
        sortOrder,
      };
    case FETCH_ACT:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export default sectorReducer;
