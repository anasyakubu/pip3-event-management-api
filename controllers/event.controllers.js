const Event = require("../models/event.model");
const Attendee = require("../models/attendee.model");

// List all events
const eventList = (req, res) => {
  Event.find({})
    .then((events) => res.status(200).json({ status: 200, data: events }))
    .catch((err) => res.status(400).json(err));
};

// Fetch details of a single event
const getEvent = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ status: 404, error: "Event not found" });
      }
      res.status(200).json({ status: 200, data: event });
    })
    .catch((err) => res.status(400).json(err));
};

// Register an attendee for an event
const registerEvent = async (req, res) => {
  try {
    const { name, email, registeredEvents } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !registeredEvents || registeredEvents.length === 0) {
      return res
        .status(400)
        .json({ status: 400, error: "All fields are required" });
    }

    const eventID = registeredEvents[0];

    // Find the event by ID
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({ status: 404, error: "Event not found" });
    }

    // Check if the email is already registered for this event
    const existingAttendee = await Attendee.findOne({
      email,
      registeredEvents: eventID,
    });
    if (existingAttendee) {
      return res.status(400).json({
        status: 400,
        error: "You are already registered for this event",
      });
    }

    // Check if the event has remaining capacity
    if (event.attendees.length >= event.capacity) {
      return res
        .status(400)
        .json({ status: 400, error: "Event capacity has been reached" });
    }

    // Register the attendee
    const newAttendee = await Attendee.findOneAndUpdate(
      { email },
      { $addToSet: { registeredEvents: eventID }, name },
      { new: true, upsert: true }
    );

    // Add the attendee to the event
    event.attendees.push({ name, email });
    await event.save();

    return res.status(200).json({
      status: 200,
      message: "Successfully registered for the event",
      event,
      attendee: newAttendee,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Create a new event
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

    // Validate required fields
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

    // Check if the event already exists
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res
        .status(400)
        .json({ status: 400, error: "Event already exists" });
    }

    // Create and save the event
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizer,
      attendees: [],
      feedback: [],
      userID,
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Update an event
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

    // Validate required fields
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

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// Delete an event
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((deletedEvent) => {
      if (!deletedEvent) {
        return res.status(404).json({ status: 404, error: "Event not found" });
      }
      res.status(200).json(deletedEvent);
    })
    .catch((err) =>
      res.status(500).json({ status: 500, error: "Internal Server Error" })
    );
};

module.exports = {
  addEvent,
  eventList,
  getEvent,
  registerEvent,
  updateEvent,
  deleteEvent,
};
