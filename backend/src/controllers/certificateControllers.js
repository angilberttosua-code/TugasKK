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

const getCertificateDetail = (req, res) => {
  const { id } = req.params;
  certificateModel.getCertificateById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil detail sertifikat",
        error: err.message,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Sertifikat tidak ditemukan",
      });
    }
    res.json({
      success: true,
      message: "Detail sertifikat berhasil diambil",
      data: result,
    });
  });
};

const createCertificate = (req, res) => {
  const {
    title,
    issuer,
    date,
    credential_id,
    verification_url,
    credentialId,
    verificationUrl,
    image_url,
  } = req.body;

  if (!title || !issuer) {
    return res.status(400).json({
      success: false,
      message: "Judul sertifikat dan penerbit wajib diisi",
    });
  }

  const certData = {
    title,
    issuer,
    date: date || "",
    credential_id: credential_id || credentialId || "",
    verification_url: verification_url || verificationUrl || "",
    image_url: image_url || "",
  };

  certificateModel.createCertificate(certData, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan sertifikat",
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Sertifikat berhasil ditambahkan",
      data: {
        id: result.insertId,
        ...certData,
      },
    });
  });
};

const updateCertificate = (req, res) => {
  const { id } = req.params;
  const {
    title,
    issuer,
    date,
    credential_id,
    verification_url,
    credentialId,
    verificationUrl,
    image_url,
  } = req.body;

  if (!title || !issuer) {
    return res.status(400).json({
      success: false,
      message: "Judul sertifikat dan penerbit wajib diisi",
    });
  }

  certificateModel.getCertificateById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data sertifikat",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Sertifikat yang akan diubah tidak ditemukan",
      });
    }

    const certData = {
      title,
      issuer,
      date: date || existing.date,
      credential_id: credential_id !== undefined ? credential_id : (credentialId !== undefined ? credentialId : existing.credential_id),
      verification_url: verification_url !== undefined ? verification_url : (verificationUrl !== undefined ? verificationUrl : existing.verification_url),
      image_url: image_url !== undefined ? image_url : existing.image_url,
    };

    certificateModel.updateCertificate(id, certData, (updateErr) => {
      if (updateErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal memperbarui data sertifikat",
          error: updateErr.message,
        });
      }

      res.json({
        success: true,
        message: "Data sertifikat berhasil diperbarui",
        data: {
          id: Number(id),
          ...certData,
        },
      });
    });
  });
};

const deleteCertificate = (req, res) => {
  const { id } = req.params;

  certificateModel.getCertificateById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data sertifikat",
        error: err.message,
      });
    }
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Sertifikat yang akan dihapus tidak ditemukan",
      });
    }

    certificateModel.deleteCertificate(id, (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal menghapus sertifikat",
          error: deleteErr.message,
        });
      }

      res.json({
        success: true,
        message: "Sertifikat berhasil dihapus",
      });
    });
  });
};

module.exports = {
  getCertificates,
  getCertificateDetail,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};