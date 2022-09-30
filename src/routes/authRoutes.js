let express = require("express");

let router = express.Router();

let authController = require("../controller/authController")

router.post("/register", authController.register)
//POST /register

router.post("/login", authController.login)
//POST /login
module.exports = router;