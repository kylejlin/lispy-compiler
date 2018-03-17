'use strict';

var _createAST = require('../createAST');

var _createAST2 = _interopRequireDefault(_createAST);

var _tokenize = require('../tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = '\n(pickRandom "foo" 9 (sum 1 2 3))\n';

var tokens = (0, _tokenize2.default)(code);
var ast = (0, _createAST2.default)(tokens);

test('it generates the correct AST', function () {
  expect(ast).toMatchSnapshot();
});