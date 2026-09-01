const db = require("../config/db");

const getDashboardStats = (callback) => {
    const query = `
    SELECT
        (SELECT COUNT(*) FROM projects) AS total_projects,
        (SELECT COUNT(*) FROM skills) AS total_skills,
        (SELECT COUNT(*) FROM certificates) AS total_certificates,
        (SELECT COUNT(*) FROM testimonials) AS total_testimonials,
        (SELECT COUNT(*) FROM contacts) AS total_messages,
        (SELECT COUNT(*) FROM contacts WHERE is_read = FALSE) AS unread_messages
    `;

    db.query(query, (err, results) => {
        if (err){
            return callback(err, null);
        }
        callback(null, results[0]);
    });
};

module.exports = {
    getDashboardStats,
};