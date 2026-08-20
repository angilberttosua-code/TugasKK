const db = require("../config/db");

const getAllCertificates = (callback) => {
    const query = "SELECT * FROM certificates ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

module.exports = {
    getAllCertificates,
};
