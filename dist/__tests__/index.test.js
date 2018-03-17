'use strict';

var _index = require('../index');

var code = '\n(pickRandom "foo" 9 (sum 1 2 3))\n';

var js = (0, _index.compileStringToString)(code);

test('it generates the correct js', function () {
  expect(js).toMatchSnapshot();
});