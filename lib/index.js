'use strict';

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _runner = require('./runner');

var _runner2 = _interopRequireDefault(_runner);

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
    repoOwner = _yaml$safeLoad.repoOwner; // import searcher from './searcher'
// import logger from './logger'


(0, _runner2.default)({ username: username, token: token, queries: (0, _queries2.default)({ username: username, repoOwner: repoOwner }) });

// let searchPr = searcher({ username, token })
//
// let promises = queries({ username, repoOwner }).map((q)=> {
//   return searchPr(q)
// })
//
// Promise.all(promises)
//   .then((values)=> {
//     values.forEach((r)=> logger(r))
//   })