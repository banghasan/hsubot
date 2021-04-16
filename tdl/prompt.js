"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = exports.getPassword = exports.getAuthCode = exports.getPhoneNumber = void 0;

// var promptly = _interopRequireWildcard(require("promptly"));
var promptly = _interopRequireWildcard(require("heroku-cli-util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getPhoneNumber = retry => promptly.prompt(retry ? 'Invalid phone number, please re-enter: ' : 'Please enter phone number: ');

exports.getPhoneNumber = getPhoneNumber;

const getAuthCode = retry => promptly.prompt(retry ? 'Wrong auth code, please re-enter: ' : 'Please enter auth code: ');

exports.getAuthCode = getAuthCode;

const getPassword = (passwordHint, retry) => promptly.password(retry ? 'Wrong password, please re-enter: ' : `Please enter password (${passwordHint}): `, {
  replace: '*'
});

exports.getPassword = getPassword;

const getName = async () => ({
  firstName: await promptly.prompt('First name:'),
  lastName: await promptly.prompt('Last name (optional):', {
    default: undefined
  })
});

exports.getName = getName;