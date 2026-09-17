const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateControllers"); // Sesuaikan nama file dengan/tanpa 's'

router.get("/", certificateController.getCertificates);
router.get("/:id", certificateController.getCertificateDetail);
router.post("/", certificateController.createCertificate);
router.put("/:id", certificateController.updateCertificate);
router.delete("/:id", certificateController.deleteCertificate);

module.exports = router;