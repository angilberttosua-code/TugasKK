const certificateModel = require("../models/certificateModels");

const getCertificates = (req, res) => {
  certificateModel.getAllCertificates((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data sertifikat",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data sertifikat berhasil diambil",
      data: results,
    });
  });
};

const createCertificate = (req, res) => {
  const { title, issuer, date, credential_id, verification_url, image_url } = req.body;

  if (!title || !issuer) {
    return res.status(400).json({
      success: false,
      message: "Field title dan issuer wajib diisi",
    });
  }

  const data = { title, issuer, date: date || "", credential_id: credential_id || "", verification_url: verification_url || "", image_url: image_url || "" };

  certificateModel.createCertificate(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambah sertifikat",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Sertifikat berhasil ditambahkan",
      data: {
        id: results.insertId,
        title,
        issuer,
        date,
        credential_id,
        verification_url,
        image_url,
      },
    });
  });
};

module.exports = {
  getCertificates,
  createCertificate,
};