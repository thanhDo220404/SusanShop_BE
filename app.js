const express = require("express");
const cors = require("cors");
const path = require("path");

const usersRouter = require("./routes/user");

const app = express();

// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Backend đang chạy");
});

app.use("/users", usersRouter);

module.exports = app;
