'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createAST = function createAST(tokens) {
  var finishCallExpression = function finishCallExpression(_ref) {
    var node = _ref.node,
        index = _ref.index;

    var token = tokens[index];

    if (node.callee === null) {
      if (token.type === 'name') {
        return finishCallExpression({
          node: _extends({}, node, {
            callee: token.value
          }),
          index: index + 1
        });
      }
      throw new SyntaxError('Call expression require a callee');
    }
    if (token.type === 'number') {
      return finishCallExpression({
        node: _extends({}, node, {
          arguments: node.arguments.concat({
            type: 'NumberLiteral',
            value: token.value
          })
        }),
        index: index + 1
      });
    }
    if (token.type === 'string') {
      return finishCallExpression({
        node: _extends({}, node, {
          arguments: node.arguments.concat({
            type: 'StringLiteral',
            value: token.value
          })
        }),
        index: index + 1
      });
    }
    if (token.type === 'paren' && token.value === '(') {
      var _finishCallExpression = finishCallExpression({
        node: {
          type: 'CallExpression',
          callee: null,
          arguments: []
        },
        index: index + 1
      }),
          subCallExpression = _finishCallExpression.node,
          nextIndex = _finishCallExpression.index;

      return finishCallExpression({
        node: _extends({}, node, {
          arguments: node.arguments.concat(subCallExpression)
        }),
        index: nextIndex
      });
    }
    if (token.type === 'paren' && token.value === ')') {
      return {
        node: node,
        index: index + 1
      };
    }
  };

  if (tokens[0].type && tokens[0].value === '(') {
    var _finishCallExpression2 = finishCallExpression({
      node: {
        type: 'CallExpression',
        callee: null,
        arguments: []
      },
      index: 1
    }),
        node = _finishCallExpression2.node;

    return {
      type: 'Program',
      body: node
    };
  }

  throw new SyntaxError('Unexpected token ' + tokens[0].value);
};

exports.default = createAST;