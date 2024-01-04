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
router.use(Auth);
router.post("/bio", UserController.createBio);
router.get("/home", ViewsController.home);
//Post
router.get("/post");
router.post("/post");
//Eventos

module.exports = router;
