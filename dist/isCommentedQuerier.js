'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_BASE = 'https://api.github.com';

async function querier(_ref) {
  var username = _ref.username,
      token = _ref.token,
      prOwner = _ref.prOwner,
      repoFullName = _ref.repoFullName,
      number = _ref.number;

  var reviewsPromise = _axios2.default.get(GITHUB_BASE + '/repos/' + repoFullName + '/pulls/' + number + '/reviews', {
    auth: {
      username: username,
      password: token
    }
  });
  var reviewersPromise = _axios2.default.get(GITHUB_BASE + '/repos/' + repoFullName + '/pulls/' + number + '/requested_reviewers', {
    auth: {
      username: username,
      password: token
    }
  });

  var reviewsResp = await reviewsPromise;
  var reviewersResp = await reviewersPromise;

  var reviewGivers = reviewsResp.data.map(function (r) {
    return r.user.login;
  });
  var reviewers = reviewersResp.data.users.map(function (r) {
    return r.login;
  });

  var commented = !included(reviewGivers.filter(function (r) {
    return r !== prOwner;
  }), reviewers);

  return { repoFullName: repoFullName, number: number, commented: commented };
}

function included(sub, container) {
  return !sub.some(function (e) {
    return !container.includes(e);
  });
}
exports.default = { querier: querier };