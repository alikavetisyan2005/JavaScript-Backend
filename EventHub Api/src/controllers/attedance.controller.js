const asyncHandler = require("../utils/asyncHandler");

const attedanceService = require("../services/attedance.service");

const joinEvent = asyncHandler(async(req, res) => {
    const {status} = req.body;
    const joined = await attedanceService.joinEvent(req.params.eventId,req.user.id, status);
    return res.status(201).json({joined});
})

const leaveEvent = asyncHandler(async(req, res) => {
    const left = await attedanceService.leaveEvent(req.params.eventId, req.user.id);

    return res.status(200).json({left});
})

const getEventAttendees = asyncHandler(async(req,  res) => {
    const attendees = await attedanceService.getEventAttendees(req.params.eventId);
    return res.status(200).json({attendees});
})


module.exports = {
    joinEvent,
    leaveEvent,
    getEventAttendees,
}

