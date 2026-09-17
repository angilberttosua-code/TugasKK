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

const getTestimonialDetail = (req, res) => {
  const { id } = req.params;
  testimonialModel.getTestimonialById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil detail testimoni",
        error: err.message,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Testimoni tidak ditemukan",
      });
    }
    res.json({
      success: true,
      message: "Detail testimoni berhasil diambil",
      data: result,
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

  const data = {
    name,
    role: role || "",
    company: company || "",
    avatar: avatar || "",
    stars: stars || 5,
    quote,
  };

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
        ...data,
      },
    });
  });
};

const updateTestimonial = (req, res) => {
  const { id } = req.params;
  const { name, role, company, avatar, stars, quote } = req.body;

  if (!name || !quote) {
    return res.status(400).json({
      success: false,
      message: "Field name dan quote wajib diisi",
    });
  }

  testimonialModel.getTestimonialById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data testimoni",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Testimoni yang akan diubah tidak ditemukan",
      });
    }

    const data = {
      name,
      role: role || "",
      company: company || "",
      avatar: avatar || "",
      stars: stars || 5,
      quote,
    };

    testimonialModel.updateTestimonial(id, data, (updateErr) => {
      if (updateErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal memperbarui testimoni",
          error: updateErr.message,
        });
      }
      res.json({
        success: true,
        message: "Testimoni berhasil diperbarui",
        data: { id: Number(id), ...data },
      });
    });
  });
};

const deleteTestimonial = (req, res) => {
  const { id } = req.params;

  testimonialModel.getTestimonialById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data testimoni",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Testimoni yang akan dihapus tidak ditemukan",
      });
    }

    testimonialModel.deleteTestimonial(id, (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal menghapus testimoni",
          error: deleteErr.message,
        });
      }
      res.json({
        success: true,
        message: "Testimoni berhasil dihapus",
      });
    });
  });
};

module.exports = {
  getTestimonials,
  getTestimonialDetail,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};