const jwt = require("jsonwebtoken");
const secret = "a;lsjdf;laksjdf;lkasjfdl;kajsdf";

function setUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
