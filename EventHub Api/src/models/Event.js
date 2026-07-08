const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    capacity: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['music', 'tech', 'sport', 'other'],
        default: 'other'
    },
    image: {
        type: String,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model("Event", EventSchema);