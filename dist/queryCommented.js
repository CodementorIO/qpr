'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isCommentedQuerier = require('./isCommentedQuerier');

var _isCommentedQuerier2 = _interopRequireDefault(_isCommentedQuerier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var username = _ref.username,
      token = _ref.token;
  return async function (_ref2) {
    var queryName = _ref2.queryName,
        poolPromise = _ref2.poolPromise;

    var isCommented = _isCommentedQuerier2.default.querier;

    var _ref3 = await poolPromise,
        items = _ref3.items;

    var nonReviewedPrs = items;
    var commentedPrs = [];

    var isCommentedPromises = nonReviewedPrs.map(function (pr) {
      return isCommented({
        username: username,
        token: token,
        number: pr.number,
        repoFullName: extractRepoFullName(pr),
        prOwner: extractPrOwner(pr)
      });
    });

    var results = await Promise.all(isCommentedPromises);

    results.forEach(function (_ref4) {
      var repoFullName = _ref4.repoFullName,
          number = _ref4.number,
          commented = _ref4.commented;

      if (commented) {
        commentedPrs.push(nonReviewedPrs.find(function (pr) {
          return pr.number === number && extractRepoFullName(pr) === repoFullName;
        }));
      }
    });

    return { queryName: queryName, items: commentedPrs };
  };
};

function extractRepoFullName(pr) {
  return pr.repository_url.replace('https://api.github.com/repos/', '');
}

function extractPrOwner(pr) {
  return pr.user.login;
}