const ANUM = /[a-zA-Z0-9]/

const tokenize = code => {
  const chars = code.split('')
  return chars.reduce((tokens, char) => {
    const latest = tokens[tokens.length - 1] || { type: 'none' }

    if (latest.type === 'string' && !latest.isTerminated) {
      if (char === '"') {
        return tokens.slice(0, -1).concat({
          ...latest,
          isTerminated: true
        })
      }
      return tokens.slice(0, -1).concat({
        ...latest,
        value: latest.value + char
      })
    }

    if (latest.type === 'number' && !latest.isTerminated) {
      if (/\d/.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          value: latest.value + char
        })
      }
      if (/\s/.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          isTerminated: true
        })
      }
      if (/\(|\)/.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          isTerminated: true
        }).concat({
          type: 'paren',
          value: char
        })
      }
      throw new SyntaxError('Unexpected token ' + char)
    }

    if (latest.type === 'name' && !latest.isTerminated) {
      if (ANUM.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          value: latest.value + char
        })
      }
      if (/\s/.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          isTerminated: true
        })
      }
      if (/\(|\)/.test(char)) {
        return tokens.slice(0, -1).concat({
          ...latest,
          isTerminated: true
        }).concat({
          type: 'paren',
          value: char
        })
      }
      throw new SyntaxError('Unexpected token ' + char)
    }

    if (/\(|\)/.test(char)) {
      return tokens.concat({
        type: 'paren',
        value: char
      })
    }
    if (/\d/.test(char)) {
      return tokens.concat({
        type: 'number',
        value: char,
        isTerminated: false
      })
    }
    if (ANUM.test(char)) {
      return tokens.concat({
        type: 'name',
        value: char,
        isTerminated: false
      })
    }
    if ('"' === char) {
      return tokens.concat({
        type: 'string',
        value: '',
        isTerminated: false
      })
    }
    if (/\s/.test(char)) {
      return tokens
    }

    throw new SyntaxError('Unexpected token ' + char)
  }, [])
}

export default tokenize
