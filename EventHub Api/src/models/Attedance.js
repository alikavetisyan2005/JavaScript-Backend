const mongoose = require("mongoose");

const attedanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    status: {
        type: String,
        enum: ["going", "interested", "cancelled"],
        default: "going",
        required: true,
    },

},
{timestamps: true}
)

attedanceSchema.index({ event: 1, user: 1 }, { unique: true });


module.exports = mongoose.model("Attedance", attedanceSchema)