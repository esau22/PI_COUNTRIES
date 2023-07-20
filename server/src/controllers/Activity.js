const axios = require("axios");

const { Activity } = require("../db");

const postActi = async function (req, res) {
  try {
    const { name, difficulty, duration, season, CountryActivity } = req.body;
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Relaciona la actividad con los países indicados
    if (CountryActivity && CountryActivity.length > 0) {
      const relatedCountryActivity = await Country.findAll({
        where: { id: CountryActivity },
      });

      await newActivity.addCountries(relatedCountryActivity);
    }

    res.status(200).json(newActivity);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Internal server error" });
  }
};

const getActivity = async function (req, res) {
  try {
    const activities = await Activity.findAll(); // Consulta todas las actividades en la base de datos
    res.status(200).json(activities); // Devuelve el arreglo de actividades como una respuesta JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Internal server error" });
  }
};

module.exports = {
  postActi,
  getActivity,
};
