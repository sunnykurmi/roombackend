const express = require("express");
const {
  homepage,
  currentuser,
  usersignup,
  usersignin,
  usersignout,
  createroom,
  adminusersignup,
  admincurrentuser,
  adminusersignin,
  bookroom,
  admincreateroom,
  adminusersignout
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//get
router.get("/", homepage);

//post /student
router.get("/user", isAuthenticated, currentuser);

//post//signup
router.post("/signup", usersignup);

//post//signup
router.post("/signin", usersignin);

//get//signout
router.get("/signout", isAuthenticated, usersignout);


//get//signout
router.post("/bookroom", isAuthenticated, bookroom);

//post /student
router.post("/admin/user", isAuthenticated, admincurrentuser);

//post//signup
router.post("/admin/signup", adminusersignup);

//post//signup
router.post("/admin/signin", adminusersignin);

//get//signout
router.get("/admin/signout", isAuthenticated, adminusersignout);


//get//signout
router.post("/admin/createroom", isAuthenticated, admincreateroom);

module.exports = router;
