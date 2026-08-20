const skillModel = require("../models/skillModels");

const getSkills = (req, res) => {
    skillModel.getAllSkills((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data skill",
                error: err.message,
            });
        }
        res.json({
            success: true,
            message: "Data skill berhasil diambil",
            data: results,
        });
    });
};

module.exports = {
    getSkills,
};
