const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const p2pDialogShema = new mongoose.Schema({
  userCreatorId: {
    type: String,
    required: true,
  },
  userResponderId: {
    type: String,
  },
  offer: {
    type: String,
    required: true,
  },
  answer: {
    type: Date,
  },
});

module.exports = mongoose.model("p2pDialog", p2pDialogShema);
