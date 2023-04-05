const { Router } = require("express");
const router = Router();
const {getState, getUsers, deleteUser, login, register, logout} = require('../controllers/data.controller.js');;

router.route("/").get(getState);
router.route('/users').get(getUsers);
router.route('/login').post(login);
router.route('/delete/:email').delete(deleteUser);
router.route('/register').post(register);
router.route('/logout').get(logout);

module.exports = router;
