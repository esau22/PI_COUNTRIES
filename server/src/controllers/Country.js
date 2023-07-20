const axios = require("axios");

const { Country } = require("../db");

const postCount = async function (req, res) {
  try {
    const {
      id,
      name,
      flagImage,
      continent,
      capital,
      subregion,
      area,
      poblacion,
    } = req.body;
    const newCountry = await Country.create({
      id,
      name,
      flagImage,
      continent,
      capital,
      subregion,
      area,
      poblacion,
    });
    res.status(200).json(newCountry);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Internal server error" });
  }
};

const getContry = async function (req, res) {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Internal server error" });
  }
};

const getCountryId = async function (req, res) {
  try {
    const { id } = req.params;
    const country = await Country.findOne({
      where: { id },
      include: "Activities", // Incluye las actividades turísticas asociadas al país
    });

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCountryName = async function (req, res) {
  try {
    const { name } = req.query;
    const countries = await Country.findAll({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        `%${name.toLowerCase()}%`
      ),
    });

    if (countries.length === 0) {
      return res
        .status(404)
        .json({ error: "No countries found with the given name" });
    }

    res.status(200).json(countries);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postCount,
  getContry,
  getCountryId,
  getCountryName,
};
