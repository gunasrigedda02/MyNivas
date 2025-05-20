const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.post("/addTest", controller.addTest);

module.exports = router;