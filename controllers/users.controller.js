const User = require("../models/User");

exports.getUser = async (req, res, next) => {
  if (!req.query.username && !req.query._id) return next("need more info");
  let user;
  if (req.query.username)
    user = await User.findOne({
      username: { $regex: new RegExp("^" + req.query.username + "$", "i") },
    });
  else if (req.query._id) user = await User.findById(req.query._id);
  res.json({
    user,
  });
};
