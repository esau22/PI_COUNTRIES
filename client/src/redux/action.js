import axios from "axios";
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  CREATE_ACTIVITY,
  SET_CURRENT_PAGE,
  SORT_COUNTRIES,
  FETCH_ACT,
} from "./actionType";

const URL = "http://localhost:3001/countries";

export const fetchCountries = () => async (dispatch) => {
  dispatch({ type: FETCH_COUNTRIES_REQUEST });

  try {
    const response = await axios.get(URL);
    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRIES_FAILURE,
      payload: error.message,
    });
  }
};

export function fetchActivity(activities) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: FETCH_ACT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const searchCountries = (searchTerm) => async (dispatch, getState) => {
  try {
    const response = await axios.get(URL);
    const countries = response.data;

    const matchingCountries = countries.filter((country) =>
      country.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: matchingCountries,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRIES_ERROR,
      payload: error.message,
    });
  }
};

export function createActivity(activity) {
  return async (dispatch) => {
    try {
      // Hacer la solicitud POST al backend para crear la actividad
      const response = await axios.post(
        "http://localhost:3001/activities",
        activity
      );
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error al crear la actividad: " + error.message);
    }
  };
}

export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  payload: pageNumber,
});

export const filterContinent = (searchTerm) => async (dispatch, getState) => {
  try {
    const response = await axios.get(URL);
    const countries = response.data;

    const matchingCountries = countries.filter((country) =>
      country.continente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: matchingCountries,
    });
  } catch (error) {
    // Maneje el error aquí, envíe una acción de error si es necesario
    // Por ejemplo:
    dispatch({
      type: FETCH_COUNTRIES_ERROR,
      payload: error.message,
    });
  }
};

export const filterActivity = (searchTerm) => async (dispatch, getState) => {
  try {
    // Obtener todos los países
    const response = await axios.get(URL);
    const countries = response.data;

    // Filtrar los países que tienen actividades que coinciden con el término de búsqueda
    const matchingCountries = countries.filter((country) =>
      country.Activities.some((activity) =>
        activity.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Crear un objeto con los países filtrados y sus actividades
    const filteredCountries = matchingCountries.map((country) => {
      return {
        ...country,
        Activities: country.Activities.filter((activity) =>
          activity.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      };
    });

    // Despachar la acción con los países filtrados y sus actividades
    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: filteredCountries,
    });
  } catch (error) {
    // Manejar el error si es necesario
  }
};

export const sortCountries = (sortBy, sortOrder, filterTerm, activityTerm) => {
  return {
    type: SORT_COUNTRIES,
    payload: { sortBy, sortOrder, filterTerm, activityTerm },
  };
};
