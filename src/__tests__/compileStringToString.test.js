import compileStringToString from '../compileStringToString'

const code = `
(pickRandom "foo" 9 (sum 1 2 3))
`

const js = compileStringToString(code)

test('it generates the correct js', () => {
  expect(js).toMatchSnapshot()
})
