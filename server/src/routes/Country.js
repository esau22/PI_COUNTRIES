const { Router } = require("express");
const router = Router();

const {
  postCount,
  getContry,
  getCountryId,
  getCountryName,
} = require("../controllers/Country");

router.post("/countries", postCount);
router.get("/countries", getContry);
router.get("/countries/:id", getCountryId);
router.get("/countries/name", getCountryName);

module.exports = router;
