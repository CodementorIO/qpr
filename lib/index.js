'use strict';

var _searcher = require('./searcher');

var _searcher2 = _interopRequireDefault(_searcher);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yaml$safeLoad = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(_path2.default.join(__dirname, '..', '.credentials.yml'), 'utf8')),
    username = _yaml$safeLoad.username,
    token = _yaml$safeLoad.token,
    repoOwner = _yaml$safeLoad.repoOwner;

var searchPr = (0, _searcher2.default)({ username: username, token: token });

var promises = (0, _queries2.default)({ username: username, repoOwner: repoOwner }).map(function (q) {
  return searchPr(q);
});

Promise.all(promises).then(function (values) {
  values.forEach(function (r) {
    return (0, _logger2.default)(r);
  });
});