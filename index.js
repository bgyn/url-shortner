const express = require("express");
const app = express();
const path = require("path");
const { connectToMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthtication, restrictTo } = require("./middlewares/auth");

const staticRouter = require("./router/staticRouter");
const urlRouter = require("./router/url");
const redirectRouter = require("./router/redirect");
const userRouter = require("./router/user");

connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthtication);

app.use("/user", userRouter);

app.use("/", staticRouter);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);

app.use("/redirect", redirectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
