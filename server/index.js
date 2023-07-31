//const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db");
const { db1 } = require("./src/db_fn/db1");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(async () => {
    await db1();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

/*conn
  .sync({ force: true })
  .then(() => {
    axios.get("http://localhost:5000/countries").then((response) => {
      let getCountry = response.data;
      getCountry.forEach(
        ({
          cca3,
          name,
          flags,
          continents,
          capital,
          subregion,
          area,
          population,
        }) => {
          if (!capital) {
            capital = ["Without Capital"];
          }

          Country.create({
            id: cca3,
            name: name.common,
            flags: flags.png,
            continents: continents[0],
            capital: capital[0],
            subregion: subregion,
            area: area,
            population: population,
          });
        }
      );
    });
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));*/
