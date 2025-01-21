const URL = require("../models/url");

async function redirectHandler(req, res) {
  const shortId = req.params.shortId;
  console.log("ids", shortId);
  const result = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitedHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  if (!result) {
    return res.status(404).json({ error: "Not founds" });
  }
  return res.redirect(result.redirectUrl);
}

module.exports = {
  redirectHandler,
};
