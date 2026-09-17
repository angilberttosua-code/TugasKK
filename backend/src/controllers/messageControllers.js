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

const toggleReadStatus = (req, res) => {
  const { id } = req.params;
  const { is_read } = req.body;

  messageModel.getMessageById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data pesan",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan",
      });
    }

    messageModel.updateReadStatus(id, is_read, (updateErr) => {
      if (updateErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal mengubah status pesan",
          error: updateErr.message,
        });
      }
      res.json({
        success: true,
        message: `Pesan berhasil ditandai sebagai ${is_read ? "sudah" : "belum"} dibaca`,
      });
    });
  });
};

const deleteMessage = (req, res) => {
  const { id } = req.params;

  messageModel.getMessageById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data pesan",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Pesan yang akan dihapus tidak ditemukan",
      });
    }

    messageModel.deleteMessage(id, (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal menghapus pesan",
          error: deleteErr.message,
        });
      }
      res.json({
        success: true,
        message: "Pesan berhasil dihapus",
      });
    });
  });
};

module.exports = {
  sendMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
};