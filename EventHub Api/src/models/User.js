const { required } = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")



const userSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["member", "organizer"],
        default: "member"
    } ,
    refreshTokenHash: {
    type: String,
    default: null,
    select: false
    }
    },
    {
        timestamps: true
    }
)


userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});
 
module.exports = mongoose.model('User', userSchema);