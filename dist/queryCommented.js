'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isCommentedQuerier = require('./isCommentedQuerier');

var _isCommentedQuerier2 = _interopRequireDefault(_isCommentedQuerier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (_ref) {
  var queryName = _ref.queryName,
      username = _ref.username,
      token = _ref.token,
      poolPromise = _ref.poolPromise;

  var isCommented = _isCommentedQuerier2.default.querier;

  var _ref2 = await poolPromise,
      items = _ref2.items;

  var nonReviewedPrs = items;
  var commentedPrs = [];

  var isCommentedPromises = nonReviewedPrs.map(function (pr) {
    return isCommented({
      username: username,
      token: token,
      number: pr.number,
      repoFullName: extractRepoFullName(pr)
    });
  });

  var results = await Promise.all(isCommentedPromises);

  results.forEach(function (_ref3) {
    var repoFullName = _ref3.repoFullName,
        number = _ref3.number,
        commented = _ref3.commented;

    if (commented) {
      commentedPrs.push(nonReviewedPrs.find(function (pr) {
        return pr.number === number && extractRepoFullName(pr) === repoFullName;
      }));
    }
  });

  return { queryName: queryName, items: commentedPrs };
};

function extractRepoFullName(pr) {
  return pr.repository_url.replace('https://api.github.com/repos/', '');
}