const express = require("express");
const router = express.Router();
const {
  addEvent,
  eventList,
  getEvent,
  registerEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controllers");

// Event
router.get("/event/list", eventList);
router.get("/event/get/:id", getEvent);
router.post("/event/add", addEvent);
router.post("/event/register", registerEvent);
router.put("/event/update/:id", updateEvent);
router.delete("/event/delete/:id", deleteEvent);

module.exports = router;
