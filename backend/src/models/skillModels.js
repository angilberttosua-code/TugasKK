const db = require("../config/db");

// Fungsi Ambil Semua Skill
const getAllSkills = (callback) => {
    const query = `
        SELECT 
            skills.id,
            skills.name,
            skills.level,
            skills.percentage,
            skill_groups.title AS group_title,
            skill_groups.icon AS group_icon
        FROM skills
        JOIN skill_groups ON skills.skill_group_id = skill_groups.id
        ORDER BY skill_groups.id ASC, skills.id ASC
    `;

    db.query(query, (err, results) => {
        callback(err, results);
    });
};

const createSkill = (data, callback) => {
    const query = `
        INSERT INTO skills (skill_group_id, name, level, percentage) 
        VALUES (?, ?, ?, ?)
    `;
    db.query(
        query, 
        [data.skill_group_id, data.name, data.level, data.percentage], 
        (err, results) => {
            callback(err, results);
        }
    );
};

module.exports = {
    getAllSkills,
    createSkill,
};