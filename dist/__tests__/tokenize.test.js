'use strict';

var _tokenize = require('../tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = '\n(pickRandom "foo" 9 (sum 1 2 3))\n';

var tokens = (0, _tokenize2.default)(code);

test('it tokenizes correctly', function () {
  expect(tokens).toMatchSnapshot();
});