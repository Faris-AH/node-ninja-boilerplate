const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const ChatController = new (require("./chat.controller"))();
const Response = require('../common/response');
const VerifyToken = require("../middleware/verify-token");
const IsUserExits = require("../middleware/is-user-exits");
const acl = require('express-acl');
/**
 * User Signup
 */
router.post('/new/:recipient?', [
  VerifyToken,
  acl.authorize,
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

  router.post('/reply/:conversationId?',[
    VerifyToken,
    acl.authorize,
    check('conversationId').exists(),
    (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        Response.Send(res, Response.ValidationError(errors.array()));
        return ;
      }
      ChatController.sendReply(req,res,next);
    }
  ]);
  router.post('/:conversationId?',[
    VerifyToken,
    acl.authorize,
    check('conversationId').exists(),
    (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        Response.Send(res, Response.ValidationError(errors.array()));
        return ;
      }
      ChatController.getConversation(req,res,next);
    }
  ]);

module.exports = router;