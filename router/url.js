const express = require("express");
const {
  handleGenerateShortUrl,
  handleUrlAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/analytics/:shortId", handleUrlAnalytics);

module.exports = router;
