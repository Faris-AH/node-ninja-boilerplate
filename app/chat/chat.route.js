const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const ChatController = new (require("./chat.controller"))();
const Response = require('../common/response');
const VerifyToken = require("../middleware/verify-token");
const IsUserExits = require("../middleware/is-user-exits");
/**
 * User Signup
 */
router.post('/new/:recipient?', [
  VerifyToken,
  check('recipient').exists(),
  IsUserExits,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Response.Send(res, Response.ValidationError(errors.array()));
      return;
    }
    ChatController.newConversation(req, res, next);
  }]);

module.exports = router;