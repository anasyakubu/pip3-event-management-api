const Event = require("../models/event.modal");

// List Event
const eventList = (req, res) => {
  Event.find({})
    .then((event) => res.status(200).json({ status: 200, data: event }))
    .catch((err) => res.status(400).json(err));
};

// Fetch Event [One]
const getEvent = (req, res) => {
  const id = req.params.id;
  Event.find({ _id: id })
    .then((event) => res.status(200).json({ status: 200, data: event }))
    .catch((err) => res.status(400).json(err));
};

//Add Recipe
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
      attendees,
      feedback,
      userID,
    } = req.body;

    // Check if all required fields are provided
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Description is required" });
    }
    if (!date) {
      return res.status(400).json({ status: 400, error: "Date is required" });
    }
    if (!instructions) {
      return time.status(400).json({ status: 400, error: "Time are required" });
    }
    if (!location) {
      return res
        .status(400)
        .json({ status: 400, error: "Location are required" });
    }
    if (!capacity) {
      return res
        .status(400)
        .json({ status: 400, error: "Capacity are required" });
    }
    if (!organizer) {
      return res
        .status(400)
        .json({ status: 400, error: "Oganizer are required" });
    }
    if (!attendees) {
      return res
        .status(400)
        .json({ status: 400, error: "Attendees are required" });
    }
    // if (!feedback) {
    //   return res
    //     .status(400)
    //     .json({ status: 400, error: "feedback are required" });
    // }
    if (!userID) {
      return res
        .status(400)
        .json({ status: 400, error: "User ID is required" });
    }

    // Check if the Event already exists
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res
        .status(400)
        .json({ status: 400, error: "Event already exists" });
    }

    // Create a new recipe in the database
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizer,
      attendees,
      feedback: "No feedback Yet",
      userID,
    });

    // Return the newly created event
    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// update Event
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
    // check if details was entered
    // Check if all required fields are provided
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Description is required" });
    }
    if (!date) {
      return res.status(400).json({ status: 400, error: "Date is required" });
    }
    if (!instructions) {
      return time.status(400).json({ status: 400, error: "Time are required" });
    }
    if (!location) {
      return res
        .status(400)
        .json({ status: 400, error: "Location are required" });
    }
    if (!capacity) {
      return res
        .status(400)
        .json({ status: 400, error: "Capacity are required" });
    }
    if (!organizer) {
      return res
        .status(400)
        .json({ status: 400, error: "Oganizer are required" });
    }
    if (!attendees) {
      return res
        .status(400)
        .json({ status: 400, error: "Attendees are required" });
    }
    // if (!feedback) {
    //   return res
    //     .status(400)
    //     .json({ status: 400, error: "feedback are required" });
    // }
    if (!userID) {
      return res
        .status(400)
        .json({ status: 400, error: "User ID is required" });
    }

    const update = await Event.findByIdAndUpdate(
      { _id: id },
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
      }
    )
      .then((update) => res.status(200).json(update))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

// delete Event
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete({ _id: id })
    .then((deleteData) => res.status(200).json(deleteData))
    .catch((err) => console.log(err));
};

module.exports = {
  addEvent,
  eventList,
  getEvent,
  updateEvent,
  deleteEvent,
};
