const { Router } = require("express");
const router = Router();

const {
  getCountry,
  getCountryId,
  getCountryName,
} = require("../controllers/Country");

router.get("/countries", getCountry);
router.get("/countries/:idPais", getCountryId);
router.get("/countries/name", getCountryName);

module.exports = router;
