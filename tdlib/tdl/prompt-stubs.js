"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = exports.getPassword = exports.getAuthCode = exports.getPhoneNumber = void 0;

const getPhoneNumber = () => {
  throw new Error('Default getPhoneNumber is not supported');
};

exports.getPhoneNumber = getPhoneNumber;

const getAuthCode = () => {
  throw new Error('Default getAuthCode is not supported');
};

exports.getAuthCode = getAuthCode;

const getPassword = () => {
  throw new Error('Default getPassword is not supported');
};

exports.getPassword = getPassword;

const getName = () => {
  throw new Error('Default getName is not supported');
};

exports.getName = getName;