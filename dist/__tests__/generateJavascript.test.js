'use strict';

var _createAST = require('../createAST');

var _createAST2 = _interopRequireDefault(_createAST);

var _tokenize = require('../tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _generateJavascript = require('../generateJavascript');

var _generateJavascript2 = _interopRequireDefault(_generateJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = '\n(pickRandom "foo" 9 (sum 1 2 3))\n';

var tokens = (0, _tokenize2.default)(code);
var ast = (0, _createAST2.default)(tokens);
var js = (0, _generateJavascript2.default)(ast);

test('it generates the correct js', function () {
  expect(js).toMatchSnapshot();
});