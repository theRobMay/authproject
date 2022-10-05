let express = require("express");

let router = express.Router();

let controller = require("../controller/messageController")

let auths = require("../middleware/auth");
// anybody can get to this one
//GET /hello

router.get("/hello", controller.hello)

// only requests that have a valid token are allowed
//GET /privateHello
router.get("/privateHello", auths.checkJWT, controller.privateHello)

module.exports = router;