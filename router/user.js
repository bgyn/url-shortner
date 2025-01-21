const express = require("express");
const router = express.Router();
const { handleUserSignUP, handleUserLogin } = require("../controllers/user");

router.post("/", handleUserSignUP);
router.post("/login", handleUserLogin);

module.exports = router;
