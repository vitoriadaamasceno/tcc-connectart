const express = require("express");
const router = express.Router();
const path = require("path");
const Auth = require("../middlewares/Auth");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/common/UserController");


//All
router.get("/", HomeController.index);
router.get("/login", HomeController.login);
router.post("/loggar", UserController.login);
router.post("/register", UserController.register);

//router.use(Auth);

//Post

//Event

module.exports = router;
