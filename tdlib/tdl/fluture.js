"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryP = void 0;

const tryP = (() => {
  try {
    const fluture = require('fluture');

    return fluture.tryP;
  } catch (e) {
    return () => {
      throw new Error('Fluture not found');
    };
  }
})();

exports.tryP = tryP;