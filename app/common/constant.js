/**
 * Created by siraj on 27/11/2017.
 */

var ResponseCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

exports.ResponseCode = ResponseCode;

var ResponseMessage = {
  UNAUTHORIZED: "Unauthorized for request.",
  SUCCESS: "Success",
  FORBIDDEN: "Not allowed for performing this action.",
  BAD_REQUEST: "Bad Request. Please verify your request input.",
  SERVER_ERROR: "Internal Server Error"
};

exports.ResponseMessage = ResponseMessage;

var SocialPlatforms = [
  'facebook',
  'linkedin',
  'google',
  'pinterest',
  'twitter',
  'instagram'
];

exports.SocialPlatforms = SocialPlatforms;

var MediaExtension = [
  'jpg',
  'jpeg',
  'png'
];

exports.MediaExtension = MediaExtension;

var LoggedInAs = {
  'default': 0,
  'facebook': 10,
  'google': 20
};

exports.LoggedInAs = LoggedInAs;