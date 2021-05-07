const router = require("express").Router();

router.route("/*").all((req, res) => {
  res.status(404).send({
    message: "Page not found",
  });
});

module.exports = router;
