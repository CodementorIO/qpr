'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors2 = require('colors');

var _colors3 = _interopRequireDefault(_colors2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var name = _ref.name,
      repos = _ref.repos;

  if (repos.length === 0) {
    return;
  }
  console.log(('=== ' + name + ' ===').bold);
  repos.forEach(function (_ref2) {
    var title = _ref2.title,
        url = _ref2.url;

    console.log(' ' + '*'.red + ' ' + title);
    console.log('   ' + url);
  });
};