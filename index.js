const express = require("express");
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
const appRoute = require("./routes/routes");
app.use("/api/auth", authRoute);
app.use(appRoute);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () =>
  console.log(`\n\n[server] Server started on http://localhost:${PORT}`)
);