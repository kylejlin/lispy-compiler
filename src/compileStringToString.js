import tokenize from './tokenize'
import createAST from './createAST'
import generateJavascript from './generateJavascript'

export default lispyStr => {
  return generateJavascript(createAST(tokenize(lispyStr)))
}
