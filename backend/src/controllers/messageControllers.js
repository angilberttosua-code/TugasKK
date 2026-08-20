const messageModel = require("../models/messageModels");

const sendMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Field name, email, dan message wajib diisi",
    });
  }

  const data = { name, email, subject: subject || "", message };

  messageModel.createMessage(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menyimpan pesan",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim dan disimpan!",
      data: {
        id: results.insertId,
        name,
        email,
        subject,
        message,
      },
    });
  });
};

const getMessages = (req, res) => {
  messageModel.getAllMessages((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data pesan",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data pesan berhasil diambil",
      data: results,
    });
  });
};

module.exports = {
  sendMessage,
  getMessages,
};