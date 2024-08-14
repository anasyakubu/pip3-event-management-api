const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    organizer: { type: String, ref: "User", required: true },
    attendees: [
      {
        name: String,
        email: String,
      },
    ],
    feedback: [
      {
        userID: { type: String, ref: "User" },
        comment: String,
        rating: Number,
      },
    ],
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
