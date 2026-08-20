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

module.exports = {
    getCertificates,
};