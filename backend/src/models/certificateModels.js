const db = require("../config/db");

const getAllCertificates = (callback) => {
    const query = "SELECT * FROM certificates ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

const createCertificate = (data, callback) => {
    const query =
        "INSERT INTO certificates (title, issuer, date, credential_id, verification_url, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
        query,
        [data.title, data.issuer, data.date, data.credential_id, data.verification_url, data.image_url],
        (err, results) => {
            callback(err, results);
        }
    );
};

module.exports = {
    getAllCertificates,
    createCertificate,
};
