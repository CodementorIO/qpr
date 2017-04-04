'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _searcher = require('./searcher');

var _searcher2 = _interopRequireDefault(_searcher);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var username = _ref.username,
      token = _ref.token,
      queries = _ref.queries;

  var searchPr = (0, _searcher2.default)({ username: username, token: token });
  var promises = queries.map(function (q) {
    return searchPr(q);
  });

  return Promise.all(promises).then(function (values) {
    values.forEach(function (v) {
      return (0, _logger2.default)(v);
    });
  });
};