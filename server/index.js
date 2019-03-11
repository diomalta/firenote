require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen(3001, () => {
  console.log("Server started on port 3001...");
});
