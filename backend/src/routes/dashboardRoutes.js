const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardControllers");

router.get("/api/dashboard/stats", dashboardController.getStats);

module.exports = router;
