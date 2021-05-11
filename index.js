const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

if (dotenv.error) console.log("Not found .env");

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () =>
  console.log("[server] MongoDB connected\n")
);
mongoose.Promise = global.Promise;

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

require("./auth/auth");

const authRoute = require("./routes/auth.routes");
const p2pRoute = require("./routes/p2p.routes");
const appRoute = require("./routes/routes");
app.use("/api/auth", authRoute);
app.use("/api/p2p", passport.authenticate("jwt", { session: false }), p2pRoute);
app.use(appRoute);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = http.createServer(app);
app.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("join", function (room) {
    socket.join(room);
  });
  socket.on("offerData", function (data) {
    socket.broadcast.emit("offerData", data);
  });
  socket.on("answerData", function (data) {
    socket.broadcast.emit("answerData", data);
  });
});

server.listen(PORT, () =>
  console.log(`\n\n[server] Server started on http://localhost:${PORT}`)
);
