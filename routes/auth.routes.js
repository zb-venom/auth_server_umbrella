const router = require("express").Router();
const passport = require("passport");
const authContoller = require("../controllers/auth.controller");

router
  .route("/signup")
  .post(
    passport.authenticate("signup", { session: false }),
    authContoller.signup
  );

router.route("/login").post(authContoller.login);

module.exports = router;
