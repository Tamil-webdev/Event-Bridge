const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  createEvent,
  getAllEvents,
  getEventsByClub,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits:{fileSize:5*1024*1024}, 
});

router.get("/", getAllEvents);
router.get("/club/:id", getEventsByClub);
router.get("/:id", getEventById);

router.post("/", auth, upload.single("image"), createEvent);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
