# lispy-compiler
To learn about how compilers are built, I built my own. Though I know it's clichéd, for the sake of simplicity I chose the same ol' lisp-like language every build-your-own-compiler beginner chooses, hence the name of the project.

## Language
The only thing you can do is call functions. This is the syntax:
```js
(funcName
  'arg1. This is how you write a string'
  1234
  (nestedFuncCall 'foo' 21 'bar')
)
```
Whitespace is only important as a token delimiter. All whitespace is treated equally ("whitespace" refers to anything that matches `/\s/`).

## Uses
This is useless. Don't use it. I only built it to learn about compiler design.
