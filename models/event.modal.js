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
    organizer: { type: String, required: true },
    attendees: [{ name: String, email: String }],
    feedback: [String],
    userID: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Events", eventSchema);
module.exports = EventModel;
