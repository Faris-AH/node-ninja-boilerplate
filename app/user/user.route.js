const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const UserController = new (require("./user.controller"))();
const Response = require('../common/response');
const VerifyToken = require("../middleware/verify-token");

/**
 * User Signup
 */
router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Response.Send(res, Response.ValidationError(errors.array()));
      return;
    }
    UserController.signupPost(req, res, next);
  }]);
router.post('/me', [
  VerifyToken,
  (req, res, next) => {
    UserController.me(req, res, next);
  }
]);
router.post('/all', [
  VerifyToken,
  (req, res, next) => { 
    UserController.fetchSignupUsers(req,res,next);
  }
])
router.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Response.Send(res, Response.ValidationError(errors.array()));
      return;

    }
    UserController.login(req, res, next);
  }
])

module.exports = router;