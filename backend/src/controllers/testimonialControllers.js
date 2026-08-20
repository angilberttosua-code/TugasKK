const testimonialModel = require("../models/testimonialModels");

const getTestimonials = (req, res) => {
    testimonialModel.getAllTestimonials((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data testimoni",
                error: err.message,
            });
        }
        res.json({
            success: true,
            message: "Data testimoni berhasil diambil",
            data: results,
        });
    });
};

module.exports = {
    getTestimonials,
};