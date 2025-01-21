const express = require("express");
const { redirectHandler } = require("../controllers/redirect");

const router = express.Router();

router.get("/:shortId", redirectHandler);

module.exports = router;
