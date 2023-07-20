const { Router } = require("express");
const router = Router();

const { postActi, getActivity } = require("../controllers/Activity");

router.post("/activities", postActi);
router.get(" /activities", getActivity);

module.exports = router;
