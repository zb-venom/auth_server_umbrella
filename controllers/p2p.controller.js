const p2pDialogModel = require("../models/P2PDialog");

exports.creatDialog = async (req, res, next) => {
  if (!req.body.user._id || !req.body.offer) return next("need more info");
  const p2pDialog = await p2pDialogModel.create({
    userCreatorId: req.body.user._id,
    offer: req.body.offer,
  });
  res.json({
    message: `Room (${p2pDialog._id}) create`,
    _id: p2pDialog._id,
  });
};

exports.destroyDialog = async (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
};
