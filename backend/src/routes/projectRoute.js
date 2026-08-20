const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectControllers");

router.get("/api/projects", projectController.getProjects);

router.get("/api/projects/:id", projectController.getProjectDetail);

module.exports = router;