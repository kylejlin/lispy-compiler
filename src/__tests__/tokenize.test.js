import tokenize from '../tokenize'

const code = `
(pickRandom "foo" 9 (sum 1 2 3))
`

const tokens = tokenize(code)

test('it tokenizes correctly', () => {
  expect(tokens).toMatchSnapshot()
})
