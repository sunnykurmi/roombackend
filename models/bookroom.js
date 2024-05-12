const mongoose = require("mongoose");

const roombookmodel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roomcreate"
    },
    checkin: {
      type: Date
    },
    checkout: {
      type: Date
    },
    rooms: {
      type: Number
    },
    guests: {
      type: Number
    }
  },
  {
    timestamps: true // Add timestamps option for createdAt and updatedAt fields
  }
);

const roombook = mongoose.model("roombook", roombookmodel);
module.exports = roombook;
