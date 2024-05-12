const express = require("express");
const {
  homepage,
  currentuser,
  usersignup,
  usersignin,
  usersignout,
  createroom,
  bookroom
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//get
router.get("/", homepage);

//post /student
router.post("/user", isAuthenticated, currentuser);

//post//signup
router.post("/signup", usersignup);

//post//signup
router.post("/signin", usersignin);

//get//signout
router.get("/signout", isAuthenticated, usersignout);

//get//signout
router.post("/createroom", isAuthenticated, createroom);

//get//signout
router.post("/bookroom", isAuthenticated, bookroom);



module.exports = router;
