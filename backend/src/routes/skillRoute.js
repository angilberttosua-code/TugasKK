const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillControllers");

router.get("/api/skills", skillController.getSkills);
router.get("/api/skills/:id", skillController.getSkillDetail);
router.post("/api/skills", skillController.createSkill);
router.put("/api/skills/:id", skillController.updateSkill);
router.delete("/api/skills/:id", skillController.deleteSkill);

router.get("/api/skill-groups", skillController.getSkillGroups);
router.post("/api/skill-groups", skillController.createSkillGroup);

module.exports = router;