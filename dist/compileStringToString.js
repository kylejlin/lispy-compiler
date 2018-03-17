'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _createAST = require('./createAST');

var _createAST2 = _interopRequireDefault(_createAST);

var _generateJavascript = require('./generateJavascript');

var _generateJavascript2 = _interopRequireDefault(_generateJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (lispyStr) {
  return (0, _generateJavascript2.default)((0, _createAST2.default)((0, _tokenize2.default)(lispyStr)));
};