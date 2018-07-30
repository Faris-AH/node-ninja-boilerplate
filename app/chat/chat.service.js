const Conversation = require('./model/conversation.model');
const Message = require('./model/message.model');
const Response = require('../common/response');
function ChatService() {

}
ChatService.prototype.createNewConversation = async function (req, res) {
  try {
    const newConversation = await Conversation.create({
      participants: [req.userId, req.params.recipient]
    });
    if (newConversation) {
      const message = await Message.create({
        conversationId: newConversation.id,
        body: req.body.message,
        author: req.userId
      });

      if (message) {
        return Response.Success(message, 'Success');
      }
    }
  }
  catch (e) {
    return Response.Error();
  }
}
ChatService.prototype.sendReply = async function (req, res) {
  try {
    const reply = await  Message.create({
      conversationId: req.params.conversationId,
      body: req.body.message,
      author: req.userId
    });
    return Response.Success(reply, 'Success');
  }
  catch (e) { 
    return Response.Error();
  }
}

module.exports = ChatService;