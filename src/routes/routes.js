const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/common/UserController");


//All
router.get("/", HomeController.index);
router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.use(Auth);
//User
//router.get("/profile", UserController.profile);
//router.put("/profile", UserController.updateProfile);
//router.delete("/profile", UserController.deleteProfile);

//Post

//Event

module.exports = router;
