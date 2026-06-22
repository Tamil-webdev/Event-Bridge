const User = require("../models/user.model");

const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("notifications")
      .populate("notifications.clubId", "name")
      .populate("notifications.eventId", "title");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notifications = user.notifications
      .slice()
      .reverse()
      .map((notification) => ({
        _id: notification._id,
        clubId: notification.clubId,
        eventId: notification.eventId,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      }));

    res.json({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: error.message });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = user.notifications.id(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await user.save();

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({ message: error.message });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notifications.forEach((notification) => {
      notification.isRead = true;
    });

    await user.save();

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
