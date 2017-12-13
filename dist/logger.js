'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors2 = require('colors');

var _colors3 = _interopRequireDefault(_colors2);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var queryName = _ref.queryName,
      items = _ref.items;

  if (items.length === 0) {
    return;
  }
  console.log(('=== ' + queryName + ' ===').bold);
  items.forEach(function (item) {
    var title = item.title;
    var url = (0, _lodash2.default)(item, ['pull_request', 'html_url']);
    console.log(' ' + '*'.red + ' ' + title);
    console.log('   ' + url);
  });
};