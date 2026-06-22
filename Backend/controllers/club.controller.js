const jwt = require("jsonwebtoken");
const Club = require("../models/club.model");
const User = require("../models/user.model");
const College = require("../models/college.model");
const Event = require("../models/event.model");

const createClub = async (req, res)=>{
  try{
    const { name, collegeId, description } = req.body;
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const club = await Club.create({
      name,
      description,
      image,
      collegeId,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    await User.findByIdAndUpdate(req.user._id, {
      role: "club_admin",
    });

    res.status(201).json({ message: "Club created successfully", club });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const joinClub = async (req, res) => {
  try {
    const userId = req.user._id;
    const { clubId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (club.members.includes(userId)) {
      return res.status(400).json({ message: "Already a member" });
    }

    club.members.push(userId);
    await club.save();

    res.json({ message: "Joined club successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const followClub = async (req, res) => {
  try {
    const userId = req.user._id;
    const clubId = req.params.id;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (club.followers.some((id) => id.toString() === userId.toString())) {
      return res.status(400).json({ message: "Already following this club" });
    }

    club.followers.push(userId);
    await club.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { followedClubs: clubId } });

    res.json({ message: "Club followed successfully", followersCount: club.followers.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const unfollowClub = async (req, res) => {
  try {
    const userId = req.user._id;
    const clubId = req.params.id;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (!club.followers.some((id) => id.toString() === userId.toString())) {
      return res.status(400).json({ message: "Not following this club" });
    }

    club.followers = club.followers.filter((id) => id.toString() !== userId.toString());
    await club.save();

    await User.findByIdAndUpdate(userId, { $pull: { followedClubs: clubId } });

    res.json({ message: "Club unfollowed successfully", followersCount: club.followers.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getclubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate("collegeId", "name")
      .sort({ name: 1 });
    res.json(clubs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getClubById = async (req, res) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
    let currentUserId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        currentUserId = decoded._id;
      } catch {
        currentUserId = null;
      }
    }

    const club = await Club.findById(req.params.id)
      .populate("createdBy", "_id name email")
      .populate("collegeId", "name");

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const followersCount = club.followers?.length || 0;
    const isFollowing = currentUserId
      ? club.followers.some((id) => id.toString() === currentUserId.toString())
      : false;

    const clubObject = club.toObject();
    clubObject.followersCount = followersCount;
    clubObject.isFollowing = isFollowing;

    res.json({ club: clubObject });
  } catch (error) {
    console.error("Get club error:", error);
    res.status(500).json({ message: error.message });
  }
};


const updateClub = async (req, res) => {
  try {
    const clubId = req.params.id;
    const userId = req.user._id;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (club.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const updatedClub = await Club.findByIdAndUpdate(clubId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Club updated successfully", club: updatedClub });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteClub = async (req, res) => {
  try {
    const clubId = req.params.id;
    const userId = req.user._id;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (club.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this club" });
    }
    await club.deleteOne();
    res.json({ message: "Club deleted successfully" });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createClub,
  joinClub,
  followClub,
  unfollowClub,
  getclubs,
  getClubById,
  updateClub,
  deleteClub,
};