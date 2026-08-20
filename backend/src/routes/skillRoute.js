const express = require("express");
const router = express.Router();
const skillControllers = require("../controllers/skillControllers");

router.get("/api/skills", skillControllers.getSkills);

module.exports = router;
