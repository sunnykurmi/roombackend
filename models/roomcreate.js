const mongoose = require("mongoose");


const roomcreatemodel = new mongoose.Schema(
  {
    user: [{
      type:mongoose.Schema.Types.ObjectId,ref:"user"
  }],
    name:{
      type:String
    },
    location:{
      type:String
    },
    description:{
      type:String
    },
    facilities:{
      type:String
    },
    price:{
      type:Number
    },
    image:{
      type:String
    },
  });
  
const roomcreate = mongoose.model("roomcreate", roomcreatemodel);
module.exports = roomcreate;
