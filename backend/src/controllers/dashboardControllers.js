const dashboardModel = require("../models/dashboardModels");

const getStats = (req, res) => {
    dashboardModel.getDashboardStats((err, stats) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data statistik dashboard",
                error: err.message,
            });
        }

        res.json({
            success: true,
            message: "Data statistik dashboard berhasil diambil",
            data: stats,
        });
    });
};

module.exports = {
    getStats,
};