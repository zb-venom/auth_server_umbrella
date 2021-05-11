const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.signup = async (req, res, next) => {
  if (req.user)
    res.json({
      message: "Signup successful",
      user: req.user,
    });
};

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email, username: user.name };
        const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

        res.json({
          user: body,
          token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
