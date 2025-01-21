const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req, res, next) {
  if (!req.cookies?.sessionId) {
    return res.redirect("/login");
  }
  const user = getUser(req.cookies.sessionId);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkauth(req, res, next) {
  const sessionId = req.cookies?.sessionId;
  const user = getUser(sessionId);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUsersOnly,
  checkauth,
};
