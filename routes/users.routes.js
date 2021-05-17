const router = require("express").Router();
const users = require("../controllers/users.controller");

router.route("/").get(users.getUser);

module.exports = router;
