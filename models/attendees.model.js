const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const attendeesSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    registeredEvents: { type: [String] },
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

const AttendeesModel = mongoose.model("Attendees", attendeesSchema);

module.exports = AttendeesModel;
