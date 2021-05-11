const router = require("express").Router();
const p2pContoller = require("../controllers/p2p.controller");

router.route("/create").post(p2pContoller.creatDialog);

router.route("/destroy").delete(p2pContoller.destroyDialog);

module.exports = router;
