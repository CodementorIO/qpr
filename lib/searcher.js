'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _lodash = require('lodash.flatmap');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_ENDPOINT = 'https://api.github.com/search/issues';

exports.default = function (_ref) {
  var username = _ref.username,
      token = _ref.token;
  return function (_ref2) {
    var name = _ref2.name,
        conditions = _ref2.conditions;

    var promises = conditions.map(function (condition) {
      return (0, _nodeFetch2.default)(generateUrl({ username: username, token: token, condition: condition })).then(function (res) {
        return res.json();
      });
    });

    return Promise.all(promises).then(function (values) {
      var repos = values.map(function (v) {
        return v.items.map(function (i) {
          return {
            title: i.title,
            url: (0, _lodash4.default)(i, ['pull_request', 'html_url'])
          };
        });
      });

      return {
        name: name,
        repos: (0, _lodash2.default)(repos)
      };
    });
  };
};

function generateUrl(_ref3) {
  var username = _ref3.username,
      token = _ref3.token,
      condition = _ref3.condition;

  var urlObj = _url2.default.parse(GITHUB_ENDPOINT);
  urlObj.auth = username + ':' + token;
  urlObj.query = { q: condition };

  return _url2.default.format(urlObj);
}