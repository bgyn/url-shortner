const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });

  res.render("home", {
    urls: allUrls,
    user: req.user,
  });
});

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  {
    const allUrls = await URL.find();
    res.render("home", {
      urls: allUrls,
      user: req.user,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
