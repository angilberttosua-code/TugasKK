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

const createTestimonial = (req, res) => {
  const { name, role, company, avatar, stars, quote } = req.body;

  if (!name || !quote) {
    return res.status(400).json({
      success: false,
      message: "Field name dan quote wajib diisi",
    });
  }

  const data = { name, role: role || "", company: company || "", avatar: avatar || "", stars: stars || 5, quote };

  testimonialModel.createTestimonial(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambah testimoni",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Testimoni berhasil ditambahkan",
      data: {
        id: results.insertId,
        name,
        role,
        company,
        avatar,
        stars,
        quote,
      },
    });
  });
};

module.exports = {
  getTestimonials,
  createTestimonial,
};