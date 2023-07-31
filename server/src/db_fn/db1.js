const axios = require("axios");
const { Country } = require("../db");

const URL = "http://localhost:5000/countries";

const db1 = async () => {
  const { data } = await axios(URL);
  console.log(data);

  for (const iterator of data) {
    await Country.findOrCreate({
      where: { id: iterator.cca3 },
      defaults: {
        id: iterator.cca3,
        nombre: iterator.name.common,
        imagen: iterator.flags.png,
        continente: iterator.continents[0],
        capital: iterator.capital,
        subregion: iterator.subregion,
        area: iterator.area,
        poblacion: iterator.population,
      },
    });
  }
};

module.exports = {
  db1,
};
