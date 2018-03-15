const createAST = tokens => {
  const finishCallExpression = ({ node, index }) => {
    const token = tokens[index]

    if (node.callee === null) {
      if (token.type === 'name') {
        return finishCallExpression({
          node: {
            ...node,
            callee: token.value
          },
          index: index + 1
        })
      }
      throw new SyntaxError('Call expression require a callee')
    }
    if (token.type === 'number') {
      return finishCallExpression({
        node: {
          ...node,
          arguments: node.arguments.concat({
            type: 'NumberLiteral',
            value: token.value
          })
        },
        index: index + 1
      })
    }
    if (token.type === 'string') {
      return finishCallExpression({
        node: {
          ...node,
          arguments: node.arguments.concat({
            type: 'StringLiteral',
            value: token.value
          })
        },
        index: index + 1
      })
    }
    if (token.type === 'paren' && token.value === '(') {
      const { node: subCallExpression, index: nextIndex } = finishCallExpression({
        node: {
          type: 'CallExpression',
          callee: null,
          arguments: []
        },
        index: index + 1
      })

      return finishCallExpression({
        node: {
          ...node,
          arguments: node.arguments.concat(subCallExpression)
        },
        index: nextIndex
      })
    }
    if (token.type === 'paren' && token.value === ')') {
      return {
        node,
        index: index + 1
      }
    }
  }

  if (tokens[0].type && tokens[0].value === '(') {
    const { node } = finishCallExpression({
      node: {
        type: 'CallExpression',
        callee: null,
        arguments: []
      },
      index: 1
    })

    return {
      type: 'Program',
      body: node
    }
  }

  throw new SyntaxError('Unexpected token ' + tokens[0].value)
}

export default createAST
