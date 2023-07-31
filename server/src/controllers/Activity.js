//const axios = require("axios");

const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

const postActi = async function (req, res) {
  try {
    const { nombre, dificultad, temporada, duracion, nameCountry } = req.body;

    if (!nombre || !dificultad || !temporada || !duracion || !nameCountry) {
      res.status(400).json({ error: "falta datos" });
    } else {
      const data = await Activity.findOne({
        where: { nombre: nombre },
      });
      if (data) {
        res.status(404).json({ error: "esta actividad ya existe" });
      } else {
        const activity = await Activity.create({
          nombre,
          dificultad,
          temporada,
          duracion,
          nameCountry,
        });
        for (const iterator of nameCountry) {
          const country = await Country.findAll({
            where: {
              nombre: {
                [Op.iLike]: `%${iterator}`,
              },
            },
          });
          await activity.addCountry(country);
        }
        return res.status(200).json({ message: "creado satisfactoriamente" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta GET /activities
const getActivity = async function (req, res) {
  try {
    const data = await Activity.findAll();
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).end(error.message);
  }
};

module.exports = {
  postActi,
  getActivity,
};
