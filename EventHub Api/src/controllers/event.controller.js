const eventService = require("../services/event.service")
const asyncHandler = require("../utils/asyncHandler");

const createEvent = asyncHandler(async(req, res) => {
    const data = req.body
    const event = await eventService.createEvent(data, req.user._id);

    return res.status(201).json({
        event
    })
})

const getAllEvents = asyncHandler(async(req, res) => {
    const events = await eventService.getAllEvents();
    return res.status(200).json({events})
})

const getEventById = asyncHandler(async(req,res) => {
    const event = await eventService.getEventById(req.params.id);
    return res.status(200).json({event});
})

const updateEvent = asyncHandler(async(req, res) => {
    const updated = await eventService.updateEvent(req.params.id, req.body, req.user);
    return res.status(200).json({updated})
})

const deleteEvent = asyncHandler(async(req, res) => {
    const deleted = await eventService.deleteEvent(req.params.id, req.user);
    return res.status(200).json({deleted});
})



module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
}




