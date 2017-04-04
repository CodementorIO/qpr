#!/usr/bin/env node
'use strict';

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _runner = require('./runner');

var _runner2 = _interopRequireDefault(_runner);

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

(0, _runner2.default)({ username: username, token: token, queries: (0, _queries2.default)({ username: username, repoOwner: repoOwner }) });