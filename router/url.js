const express = require("express");
const {
  handleGenerateShortUrl,
  handleUrlAnalytics,
  handleDeleteURl,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/analytics/:shortId", handleUrlAnalytics);

router.post("/delete/:shortId", handleDeleteURl);

module.exports = router;
