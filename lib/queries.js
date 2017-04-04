'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var username = _ref.username,
      repoOwner = _ref.repoOwner;

  return [{
    name: 'To Be Merged',
    conditions: ['user:' + repoOwner + ' author:' + username + ' type:pr state:open review:approved']
  }, {
    name: 'Requested Change',
    conditions: ['user:' + repoOwner + ' author:' + username + ' type:pr state:open review:changes_requested', 'user:' + repoOwner + ' author:' + username + ' type:pr state:open comments:>1 review:none']
  }, {
    name: 'To Review',
    conditions: ['user:' + repoOwner + ' type:pr state:open review-requested:' + username]
  }];
};