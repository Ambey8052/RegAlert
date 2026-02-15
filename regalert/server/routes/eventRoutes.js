const express = require("express");
const { createEvent, getUserEvents } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", protect, getUserEvents);

module.exports = router;
