const Event = require("../models/event.model");
const Club = require("../models/club.model");
const User = require("../models/user.model");

const createEvent = async (req, res) => {
  try{
    const userId = req.user.id || req.user._id;

    const { title, description, eventDate, eventTime, clubId } = req.body;

    let image = req.body.image || "";
    if(req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if(!title || !description || !eventDate || !clubId) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const members = club.members || [];

    const isAllowed = club.createdBy.toString() === userId.toString();

    if(!isAllowed) {
      return res.status(403).json({
        message: "Not authorized to create event for this club",
      });
    }

    const event = await Event.create({
      title,
      description,
      eventDate,
      eventTime,
      image,
      clubId: club._id,
      collegeId: club.collegeId,
      createdBy: userId,
    });

    if (club.followers?.length) {
      const notification = {
        clubId: club._id,
        eventId: event._id,
        message: `New event "${event.title}" published by ${club.name}`,
        isRead: false,
        createdAt: new Date(),
      };

      await User.updateMany(
        { _id: { $in: club.followers } },
        { $push: { notifications: notification } }
      );
    }

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true })
      .populate("clubId", "name")
      .populate("collegeId", "name address")
      .populate("createdBy", "name")
      .sort({ eventDate: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventsByClub = async (req, res) => {
  try {
    const events = await Event.find({ clubId: req.params.id })
      .populate("clubId", "name")
      .populate("collegeId", "name address")
      .populate("createdBy", "name")
      .sort({ eventDate: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res)=>{
  try{
    const event = await Event.findById(req.params.id)
      .populate("clubId", "name")
      .populate("collegeId", "name address")
      .populate("createdBy", "name");

    if(!event){
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async(req,res)=>{
  try{
    const userId = req.user.id || req.user._id;

    const event = await Event.findById(req.params.id);
    if(!event){
      return res.status(404).json({ message: "Event not found" });
    }

    if(event.createdBy.toString() !== userId.toString()){
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({ message: "Event updated successfully", event });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async(req, res)=>{
  try {
    const userId = req.user.id || req.user._id;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventsByClub,
  getEventById,
  updateEvent,
  deleteEvent,
};
