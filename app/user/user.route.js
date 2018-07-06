const express = require('express');
const router = express.Router();

const UserController = new (require("./user.controller"))();

/**
 * User Signup
 */
router.post('/signup', function (req, res, next) {
  UserController.signupPost(req, res, next);
});

module.exports = router;