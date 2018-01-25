"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var searchers = _ref.searchers,
      logger = _ref.logger;

  return Promise.all(searchers).then(function (values) {
    values.forEach(function (vs) {
      return logger(vs);
    });
  }).catch(function (e) {
    return console.log(e);
  });
};