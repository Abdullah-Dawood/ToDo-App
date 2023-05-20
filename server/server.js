const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/user", userRoutes);

app.use("/todo", todoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
  });
}

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to Database and listening to port:", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
