const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialControllers");

router.get("/api/Testimonials", testimonialController.getTestimonials);

module.exports = router;
