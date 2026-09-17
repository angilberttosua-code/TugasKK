const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Tidak ada file yang diunggah",
    });
  }

  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: "Gambar berhasil diunggah",
    data: { url: fileUrl },
  });
});

module.exports = router;