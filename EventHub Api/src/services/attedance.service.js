const Attendance = require("../models/Attedance");
const Event = require('../models/Event');

const AppError = require("../utils/AppError");

async function joinEvent(eventId, userId,status = "going"){
    const event = await Event.findById(eventId);
    if(!event){
        throw new AppError(404, "Event not found");
    }

    if(status == "going" && event.capacity > 0){
        const goingCount = Attendance.countDocuments({
            event: eventId,
            status: "going",
        })

        if(goingCount >= event.capacity){
            throw new Error(409, "Event is full");
        }
    }

    const attedance = await Attendance.create({
        event: eventId,
        user: userId,
        status,
    })

    return attedance
}

async function leaveEvent(eventId, userId){
    const event = await Event.findById(eventId);
    if(!event){
        throw new AppError(404, "Event not found");
    }

    const isJoined = await Attendance.findOneAndDelete({
        event: eventId,
        user: userId
    });

    if(!isJoined){
        throw new AppError(404, "Is not joined");
    }

    return isJoined;
}

async function getEventAttendees(eventId) {
  const attendees = await Attendance.find({ event: eventId }).populate("user", "name email");
  return attendees;
}


module.exports = {
    joinEvent, 
    leaveEvent,
    getEventAttendees,

}



