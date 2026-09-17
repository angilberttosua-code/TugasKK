const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectControllers");

router.get("/api/projects", projectController.getProjects);
router.get("/api/projects/:id", projectController.getProjectDetail);
router.post("/api/projects", projectController.createProject);
router.put("/api/projects/:id", projectController.updateProject);
router.delete("/api/projects/:id", projectController.deleteProject);

module.exports = router;