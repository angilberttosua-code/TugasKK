const db = require("../config/db");

const getAllTestimonials = (callback) => {
    const query = "SELECT * FROM testimonials ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

const getTestimonialById = (id, callback) => {
    const query = "SELECT * FROM testimonials WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0] || null);
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

const updateTestimonial = (id, data, callback) => {
    const query = `
        UPDATE testimonials
        SET name = ?, role = ?, company = ?, avatar = ?, stars = ?, quote = ?
        WHERE id = ?
    `;
    db.query(
        query,
        [data.name, data.role, data.company, data.avatar, data.stars, data.quote, id],
        (err, results) => {
            callback(err, results);
        }
    );
};

const deleteTestimonial = (id, callback) => {
    const query = "DELETE FROM testimonials WHERE id = ?";
    db.query(query, [id], (err, results) => {
        callback(err, results);
    });
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};