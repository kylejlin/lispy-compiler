'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ANUM = /[a-zA-Z0-9]/;

var tokenize = function tokenize(code) {
  var chars = code.split('');
  return chars.reduce(function (tokens, char) {
    var latest = tokens[tokens.length - 1] || { type: 'none' };

    if (latest.type === 'string' && !latest.isTerminated) {
      if (char === '"') {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          isTerminated: true
        }));
      }
      return tokens.slice(0, -1).concat(_extends({}, latest, {
        value: latest.value + char
      }));
    }

    if (latest.type === 'number' && !latest.isTerminated) {
      if (/\d/.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          value: latest.value + char
        }));
      }
      if (/\s/.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          isTerminated: true
        }));
      }
      if (/\(|\)/.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          isTerminated: true
        })).concat({
          type: 'paren',
          value: char
        });
      }
      throw new SyntaxError('Unexpected token ' + char);
    }

    if (latest.type === 'name' && !latest.isTerminated) {
      if (ANUM.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          value: latest.value + char
        }));
      }
      if (/\s/.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          isTerminated: true
        }));
      }
      if (/\(|\)/.test(char)) {
        return tokens.slice(0, -1).concat(_extends({}, latest, {
          isTerminated: true
        })).concat({
          type: 'paren',
          value: char
        });
      }
      throw new SyntaxError('Unexpected token ' + char);
    }

    if (/\(|\)/.test(char)) {
      return tokens.concat({
        type: 'paren',
        value: char
      });
    }
    if (/\d/.test(char)) {
      return tokens.concat({
        type: 'number',
        value: char,
        isTerminated: false
      });
    }
    if (ANUM.test(char)) {
      return tokens.concat({
        type: 'name',
        value: char,
        isTerminated: false
      });
    }
    if ('"' === char) {
      return tokens.concat({
        type: 'string',
        value: '',
        isTerminated: false
      });
    }
    if (/\s/.test(char)) {
      return tokens;
    }

    throw new SyntaxError('Unexpected token ' + char);
  }, []);
};

exports.default = tokenize;