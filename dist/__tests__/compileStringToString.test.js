'use strict';

var _compileStringToString = require('../compileStringToString');

var _compileStringToString2 = _interopRequireDefault(_compileStringToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = '\n(pickRandom "foo" 9 (sum 1 2 3))\n';

var js = (0, _compileStringToString2.default)(code);

test('it generates the correct js', function () {
  expect(js).toMatchSnapshot();
});