const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageControllers");

router.post("/api/messages", messageController.sendMessage);
router.get("/api/messages", messageController.getMessages);
router.put("/api/messages/:id/read", messageController.toggleReadStatus);
router.delete("/api/messages/:id", messageController.deleteMessage);

module.exports = router;