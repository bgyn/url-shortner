const URL = require("../models/url");
const ids = require("short-id");

async function handleGenerateShortUrl(req, res) {
  const shortId = ids.generate();
  try {
    if (!req.body.url) {
      return res.status(400).json({ error: "Url is required" });
    }
    const redirectUrl = req.body.url;
    await URL.create({
      shortId: shortId,
      redirectUrl: redirectUrl,
      visitedHistory: [],
      createdBy: req.user._id,
    });
    return res.render("home", {
      id: shortId,
    });
    // return res.status(201).json({ shortId: shortId });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(200).json({
      visitedHistory: result.visitedHistory,
      visitedCount: result.visitedHistory.length,
    });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateShortUrl,
  handleUrlAnalytics,
};
