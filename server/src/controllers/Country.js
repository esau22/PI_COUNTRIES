const axios = require("axios");
const { Country, Activity } = require("../db");

//const URL = "http://localhost:30001/countries";

const getCountry = async function (req, res) {
  try {
    const data = await Country.findAll({
      include: [{ model: Activity }],
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).end(error.message);
  }
};

const getCountryId = async function (req, res) {
  const idPais = req.params.idPais.toUpperCase(); // Convertimos el ID a mayúsculas por si viene en minúsculas

  try {
    const country = await Country.findOne({ where: { id: idPais } });

    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ error: "País no encontrado" });
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
};

// Función para obtener países por nombre
const getCountryName = async function (req, res) {
  const nombrePais = req.query.nombrePais.toUpperCase(); // Capturar el nombre del país desde los parámetros de consulta

  try {
    const country = await Country.findOne({ where: { nombre: nombrePais } });

    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ error: "País no encontrado" });
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
};

module.exports = {
  getCountry,
  getCountryId,
  getCountryName,
};
