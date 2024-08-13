const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendeesSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: "Events" }],
  },
  { timestamps: true }
);

const AttendeesModel = mongoose.model("Attendees", attendeesSchema);
module.exports = AttendeesModel;
