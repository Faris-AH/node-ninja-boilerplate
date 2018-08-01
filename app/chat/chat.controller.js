const Conversation = require('./model/conversation.model'),
      Message = require('./model/message.model')
      ChatService = new (require('./chat.service'))()
      Response = require('../common/response');
function ChatController() {

}

ChatController.prototype.newConversation = async function (req, res, next) {
  try {
    let response = await ChatService.createNewConversation(req, res);
    Response.Send(res, response);
  }
  catch (e) {
    Response.Send(res, Response.Error());
  }
};
ChatController.prototype.sendReply = async function(req, res, next){
  try{
    let response = await ChatService.sendReply(req,res);
    Response.Send(res, response);
  }
  catch(e){
    Response.Send(res, Response.Error());
  }
};
ChatController.prototype.getConversation = async function(req,res,next){
  try {
    let response = await ChatService.getConversation(req,res);
    Response.Send(res,response);
  } catch (err) {
    Response.Send(res,Response.Error());
  }
}

module.exports = ChatController;
