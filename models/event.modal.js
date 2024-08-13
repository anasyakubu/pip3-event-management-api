const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    organizer: { type: [String], required: true },
    attendees: { type: [String], required: true },
    feedback: { type: [String] },
    userID: {
      type: String,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

const EventModel = mongoose.model("Events", eventSchema);

module.exports = EventModel;
