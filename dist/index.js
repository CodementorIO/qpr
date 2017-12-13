#!/usr/bin/env node
'use strict';

var _runner = require('./runner');

var _runner2 = _interopRequireDefault(_runner);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _queryCommented = require('./queryCommented');

var _queryCommented2 = _interopRequireDefault(_queryCommented);

var _searchProxy = require('./searchProxy');

var _searchProxy2 = _interopRequireDefault(_searchProxy);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yaml$safeLoad = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(_path2.default.join(_os2.default.homedir(), '.qpr.credentials.yml'), 'utf8')),
    username = _yaml$safeLoad.username,
    token = _yaml$safeLoad.token,
    repoOwner = _yaml$safeLoad.repoOwner;

var searchProxy = (0, _searchProxy2.default)({ username: username, token: token });
var queryCommented = (0, _queryCommented2.default)({ username: username, token: token });

var nonReviewedPrsPool = searchProxy({
  queryName: '_',
  condition: 'user:' + repoOwner + ' author:' + username + ' type:pr state:open review:none'
});

(0, _runner2.default)({
  logger: _logger2.default,
  searchers: [searchProxy({
    queryName: 'To Review',
    condition: 'user:' + repoOwner + ' type:pr state:open review-requested:' + username
  }), searchProxy({
    queryName: 'To Be Merged',
    condition: 'user:' + repoOwner + ' author:' + username + ' type:pr state:open review:approved'
  }), searchProxy({
    queryName: 'Requested Change',
    condition: 'user:' + repoOwner + ' author:' + username + ' type:pr state:open review:changes_requested'

  }), queryCommented({
    queryName: 'Commented',
    poolPromise: nonReviewedPrsPool
  })]
});