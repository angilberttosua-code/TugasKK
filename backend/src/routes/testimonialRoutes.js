const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialControllers");

router.get("/api/Testimonials", testimonialController.getTestimonials);
router.post("/api/Testimonials", testimonialController.createTestimonial);

module.exports = router;
