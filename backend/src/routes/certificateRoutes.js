const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateControllers");

router.get("/api/certificates", certificateController.getCertificates);

module.exports = router;
