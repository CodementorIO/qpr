'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_ENDPOINT = 'https://api.github.com/search/issues';

exports.default = async function (_ref) {
  var queryName = _ref.queryName,
      username = _ref.username,
      token = _ref.token,
      condition = _ref.condition;

  var res = await _axios2.default.get(GITHUB_ENDPOINT, {
    auth: {
      username: username,
      password: token
    },
    params: { q: condition }
  });

  return { queryName: queryName, items: res.data.items };
};