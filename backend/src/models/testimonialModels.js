const db = require("../config/db");

const getAllTestimonials = (callback) => {
    const query = "SELECT * FROM testimonials ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

const createTestimonial = (data, callback) => {
    const query = `
        INSERT INTO testimonials (name, role, company, avatar, stars, quote)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
        query,
        [data.name, data.role, data.company, data.avatar, data.stars, data.quote],
        (err, results) => {
            callback(err, results);
        }
    );
};

module.exports = {
    getAllTestimonials,
    createTestimonial,
};