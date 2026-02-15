const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      organization,
      eventDate,
      registrationLink,
      emailUsed,
      passwordUsed,
      reminderTime,
    } = req.body;

    const event = await Event.create({
      user: req.user._id,
      title,
      organization,
      eventDate,
      registrationLink,
      emailUsed,
      passwordUsed,
      reminderTime,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events for Logged-in User
exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id }).sort({ eventDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
