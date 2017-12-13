'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_ENDPOINT = 'https://api.github.com/search/issues';

exports.default = function (_ref) {
  var username = _ref.username,
      token = _ref.token;
  return async function (_ref2) {
    var queryName = _ref2.queryName,
        condition = _ref2.condition;

    var res = await _axios2.default.get(GITHUB_ENDPOINT, {
      auth: {
        username: username,
        password: token
      },
      params: { q: condition }
    });

    return { queryName: queryName, items: res.data.items };
  };
};