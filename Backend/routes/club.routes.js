const express = require("express");
const {
  createClub,
  joinClub,
  followClub,
  unfollowClub,
  getclubs,
  updateClub,
  deleteClub,
  getClubById,
} = require("../controllers/club.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/", getclubs);

router.post("/join", authMiddleware, joinClub);
router.post("/:id/follow", authMiddleware, followClub);
router.delete("/:id/follow", authMiddleware, unfollowClub);
router.post("/", authMiddleware, upload.single("image"), createClub);

router.get("/:id", getClubById);
router.put("/:id", authMiddleware, updateClub);
router.delete("/:id", authMiddleware, deleteClub);

module.exports = router;
