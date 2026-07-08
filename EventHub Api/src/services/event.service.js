const Event = require("../models/Event");
const AppError = require("../utils/AppError");

async function createEvent(data, userId) {
  const event = await Event.create({
    ...data,
    organizer: userId,
  });

  return event;
}

async function getAllEvents() {
  const events = await Event.find();
  return events;
}

async function getEventById(id) {
  const event = await Event.findById(id);
  if (!event) throw new AppError(404, "Event not found");

  return event;
}

async function updateEvent(id, data, user) {
  const event = await Event.findById(id);
  if (!event) throw new AppError(404, "Event not found");

  if (event.organizer.toString() !== user._id.toString()) {
    throw new AppError(403, "Not allowed");
  }
  const updated = await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

async function deleteEvent(id, user) {
  const event = await Event.findById(id);
  if (!event) {
    throw new AppError(404, "Event not found");
  }

  if (event.organizer.toString() !== user._id.toString()) {
    throw new AppError(403, "Not allowed");
  }

  const deleted = await Event.findByIdAndDelete(id);
  return deleted;
}


module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
};
