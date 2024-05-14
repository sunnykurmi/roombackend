const { catchError } = require("../middlewares/catchError");
const usermodel = require("../models/usermodel");
const adminmodel = require("../models/adminmodel");
const roommodel = require("../models/roomcreate");
const bookmodel = require("../models/bookroom");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");

exports.homepage = catchError(async (req, res, next) => {
  const allrooms  = await roommodel.find().exec();
  res.json({ message: "homepage",allrooms});
});

exports.usersignup = catchError(async (req, res, next) => {
  const newUser = await new usermodel(req.body).save();
  sendtoken(newUser, 201, res);
});


exports.currentuser = catchError(async (req, res, next) => {
  const loggedinuser = await usermodel
    .findById(req.id)
    .populate({
      path: "roomsbooked",
      populate:{
        path:"room",
        model:"roomcreate"
      }
    })
    .exec();
  res.json({ loggedinuser });
});

exports.usersignin = catchError(async (req, res, next) => {
  const founduser = await usermodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!founduser)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = founduser.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  sendtoken(founduser, 200, res);
});

exports.usersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});




///////////////////////Book room////////////////////////

exports.bookroom = catchError(async (req, res, next) => {
  const room=req.body.id;
  const newRoom = await new bookmodel(req.body).save();
  const loggedinuser = await usermodel
    .findById(req.id)
    .exec();
  newRoom.user = loggedinuser._id;
  newRoom.room = room;
  loggedinuser.roomsbooked.push(newRoom._id)
  await loggedinuser.save();
  await newRoom.save();
  res.json({ newRoom });
});






exports.adminusersignup = catchError(async (req, res, next) => {
  const newUser = await new adminmodel(req.body).save();
  sendtoken(newUser, 201, res);
});


exports.admincurrentuser = catchError(async (req, res, next) => {
  const loggedinuser = await adminmodel
    .findById(req.id)
    .populate("roomscreated")
    .exec();
  res.json({ loggedinuser });
});

exports.adminusersignin = catchError(async (req, res, next) => {
  const founduser = await adminmodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!founduser)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = founduser.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  sendtoken(founduser, 200, res);
});

exports.adminusersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});


///////////////////////create room////////////////////////

exports.admincreateroom = catchError(async (req, res, next) => {
  const newRoom = await new roommodel(req.body).save();
  const loggedinuser = await adminmodel
    .findById(req.id)
    .exec();
  newRoom.user = loggedinuser._id;
  loggedinuser.roomscreated.push(newRoom._id)
  await loggedinuser.save();
  await newRoom.save();
  res.json({ newRoom });
});