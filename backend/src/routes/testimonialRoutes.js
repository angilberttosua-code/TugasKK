const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialControllers");

router.get("/api/testimonials", testimonialController.getTestimonials);
router.get("/api/testimonials/:id", testimonialController.getTestimonialDetail);
router.post("/api/testimonials", testimonialController.createTestimonial);
router.put("/api/testimonials/:id", testimonialController.updateTestimonial);
router.delete("/api/testimonials/:id", testimonialController.deleteTestimonial);

module.exports = router;