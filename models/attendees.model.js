const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    registeredEvents: { type: [Schema.Types.ObjectId], ref: "Event" },
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
