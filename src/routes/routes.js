const express = require("express");
const router = express.Router();
const path = require("path");
const Auth = require("../middlewares/Auth");
const ViewsController = require("../controllers/ViewsController");
const UserController = require("../controllers/common/UserController");


//All
router.get("/", ViewsController.index);
router.get("/login", ViewsController.login);
router.post("/login", UserController.login);
router.get("/register", ViewsController.register);
router.post("/register", UserController.register);
router.get("/bio", ViewsController.bio);
router.get("/home", ViewsController.home);
//router.use(Auth);

//Post

//Eventos

module.exports = router;
