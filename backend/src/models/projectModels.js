const db = require("../config/db");

const getAllProjects = (callback) => {
  const query = "SELECT * FROM projects ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    callback(err, results);
  });
};

const getProjectById = (id, callback) => {
  const query = "SELECT * FROM projects WHERE id = ?";
  db.query(query, [id], (err, results) => {
    callback(err, results[0]);
  });
};

module.exports = {
  getAllProjects,
  getProjectById,
};