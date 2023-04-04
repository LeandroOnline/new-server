const { Router } = require("express");
const router = Router();
const {getState} = require('../controllers/data.controller.js');;

router.route("/").get(getState);

module.exports = router;
