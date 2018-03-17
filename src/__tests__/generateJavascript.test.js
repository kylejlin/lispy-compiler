import createAST from '../createAST'
import tokenize from '../tokenize'
import generateJavascript from '../generateJavascript'

const code = `
(pickRandom "foo" 9 (sum 1 2 3))
`

const tokens = tokenize(code)
const ast = createAST(tokens)
const js = generateJavascript(ast)

test('it generates the correct js', () => {
  expect(js).toMatchSnapshot()
})
