
var _ = require("underscore");
const ResponseMessage = require('./constant').ResponseMessage;
const ResponseCode = require('./constant').ResponseCode;

var Response = function (data, status, message) {
    if (status == undefined) {
        status = 200;
    }

    if (message == undefined) {
        message = "";
    }

    if (data == undefined) {
        data = null;
    }

    this.data = data;
    this.status = status;
    this.message = message;
};

Response.prototype.isError = function () {
    return !this.isSuccess();
};

Response.prototype.isSuccess = function () {
    var isSuccess = true;

    if (this.status != 200) {
        isSuccess = false;
    }

    return isSuccess;
};


Response.Success = function (data, message) {
    return new Response(data, ResponseCode.OK, message || ResponseMessage.SUCCESS);
};

Response.Error = function (message, data) {
    return new Response(data || null, ResponseCode.SERVER_ERROR, message || ResponseMessage.SERVER_ERROR);
};

Response.ValidationError = function (message) {
    var validationMessage = [];

    for (var index = 0; index < message.length; index++) {
        validationMessage.push(message[index].param.replace(/_/g, " "));
    }

    validationMessage = _.unique(validationMessage);
    validationMessage = "Invalid value for " + validationMessage.join(", ") + ".";

    return new Response(null, ResponseCode.BAD_REQUEST, validationMessage || ResponseMessage.BAD_REQUEST);
};

Response.BadRequest = function (message) {
    return new Response(null, ResponseCode.BAD_REQUEST, message || ResponseMessage.BAD_REQUEST);
};

Response.Unauthorized = function (message) {
    return new Response(null, ResponseCode.UNAUTHORIZED, message || ResponseMessage.UNAUTHORIZED);
};

Response.Forbidden = function (message) {
    return new Response(null, ResponseCode.FORBIDDEN, message || ResponseMessage.FORBIDDEN);
};

Response.NotFound = function (message) {
    return new Response(null, ResponseCode.NOT_FOUND, message || ResponseMessage.NOT_FOUND);
};

module.exports = Response;