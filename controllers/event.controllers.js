const Event = require("../models/event.model");
const Attendees = require("../models/attendees.model");

// List Events
const eventList = (req, res) => {
  Event.find({})
    .then((events) => res.status(200).json({ status: 200, data: events }))
    .catch((err) => res.status(400).json({ status: 400, error: err.message }));
};

// Fetch Event [One]
const getEvent = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .then((event) => res.status(200).json({ status: 200, data: event }))
    .catch((err) => res.status(400).json({ status: 400, error: err.message }));
};

// Register Event
const registerEvent = async (req, res) => {
  try {
    const { name, email, registeredEvents } = req.body;

    if (!name || !email || !registeredEvents || registeredEvents.length === 0) {
      return res
        .status(400)
        .json({ status: 400, error: "All fields are required" });
    }

    const eventID = registeredEvents[0];
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({ status: 404, error: "Event not found" });
    }

    const existingAttendee = await Event.findOne({
      _id: eventID,
      "attendees.email": email,
    });
    if (existingAttendee) {
      return res
        .status(400)
        .json({
          status: 400,
          error: "You are already registered for this event",
        });
    }

    if (event.attendees.length >= event.capacity) {
      return res
        .status(400)
        .json({ status: 400, error: "Event capacity has been reached" });
    }

    event.attendees.push({ name, email });
    await event.save();

    const attendee = await Attendees.findOneAndUpdate(
      { email },
      { $addToSet: { registeredEvents: eventID } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Successfully registered for the event",
      event,
      attendee,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Add Event
const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizer,
      userID,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !capacity ||
      !organizer ||
      !userID
    ) {
      return res
        .status(400)
        .json({ status: 400, error: "All fields are required" });
    }

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res
        .status(400)
        .json({ status: 400, error: "Event already exists" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizer,
      feedback: [],
      attendees: [],
      userID,
    });

    return res.status(201).json({ status: 201, data: event });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizer,
      attendees,
      feedback,
      userID,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !capacity ||
      !organizer ||
      !userID
    ) {
      return res
        .status(400)
        .json({ status: 400, error: "All fields are required" });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        time,
        location,
        capacity,
        organizer,
        attendees,
        feedback,
        userID,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ status: 404, error: "Event not found" });
    }

    return res.status(200).json({ status: 200, data: event });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Delete Event
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((deletedEvent) =>
      res.status(200).json({ status: 200, data: deletedEvent })
    )
    .catch((err) => res.status(400).json({ status: 400, error: err.message }));
};

module.exports = {
  addEvent,
  eventList,
  getEvent,
  registerEvent,
  updateEvent,
  deleteEvent,
};
