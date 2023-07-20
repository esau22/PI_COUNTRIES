const { Router } = require("express");
const router = Router();
const country = require("./Country");
const activity = require("./Activity");

router.use("/", country);

router.use("/", activity);

module.exports = router;
