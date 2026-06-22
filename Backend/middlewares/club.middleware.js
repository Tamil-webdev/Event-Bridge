const Club = require("../models/club.model");

const isClubMember = async (req, res, next) => {
  try {
    const clubId = req.body.clubId || req.params.clubId;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (!club.member.includes(req.user._id)) {
      return res.status(403).json({ message: "Not a club member" });
    }

    req.club = club;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const isClubAdmin = async (req, res, next) => {
  try {
    const clubId = req.params.clubId;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (club.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only club admin allowed" });
    }

    req.club = club;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {isClubMember, isClubAdmin};