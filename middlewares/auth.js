const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req, res, next) {
  if (!req.cookies?.sessionId) {
    return res.redirect("/login");
  }
  const user = getUser(req.cookies.token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkauth(req, res, next) {
  const token = req.cookies?.token;
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUsersOnly,
  checkauth,
};
