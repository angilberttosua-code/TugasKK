const db = require("../config/db");

const createMessage = (data, callback) => {
  const query = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(query, [data.name, data.email, data.subject, data.message], (err, results) => {
    callback(err, results);
  });
};

const getAllMessages = (callback) => {
  const query = "SELECT * FROM contacts ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    callback(err, results);
  });
};

const getMessageById = (id, callback) => {
  const query = "SELECT * FROM contacts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0] || null);
  });
};

const updateReadStatus = (id, isRead, callback) => {
  const query = "UPDATE contacts SET is_read = ? WHERE id = ?";
  db.query(query, [isRead ? 1 : 0, id], (err, results) => {
    callback(err, results);
  });
};

const deleteMessage = (id, callback) => {
  const query = "DELETE FROM contacts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateReadStatus,
  deleteMessage,
};