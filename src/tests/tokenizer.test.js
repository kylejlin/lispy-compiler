import tokenize from '../tokenize'

const code = `
(hi (all 8 "foo"))
`

const tokens = tokenize(code)

console.log(tokens)
