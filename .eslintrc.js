// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

module.exports = {
    parser: 'babel-eslint',
    parserOptions:
    {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        codeFrame: false
    },
    rules: {
      ///////
      // BEST PRACTICES
      // These rules relate to better ways of doing things to help you avoid problems:
      ///////
      // always check for ===
      'eqeqeq': 2,
      // disallow with statements
      'no-with': 2,
      // require vars to be defined at the top of functions
      'vars-on-top': 2,
      // disallow use of the void operator
      'no-void': 2,
      // disallow the use of arguments.caller or arguments.callee
      'no-caller': 2,
      // disallow Yoda condition
      'yoda': 2,
      // disallow else blocks after return statements in if statements
      'no-else-return': 2,
      // require for-in loops to include an if statement
      'guard-for-in': 2,


      ///////
      // VARIABLES
      // These rules relate to variable declarations:
      ///////
      // disallow the use of undeclared variables unless mentioned in /*global */ comments
      'no-undef': 2,
      // disallow the use of undefined as an identifier
      'no-undefined': 2,
      // disallow initializing variables to undefined
      'no-undef-init': 2,


      ///////
      // POSSIBLE ERRORS
      // These rules relate to possible syntax or logic errors in JavaScript code:
      ///////
      // disallow unnecessary semicolons
      'no-extra-semi': 2,
      // allow debugger; only in development mode
      'no-debugger': process.env.NODE_ENV === 'PRODUCTION' ? 2 : 0,
      // allow console
      'no-console': 0,
      // disallow assignment operators in conditional expressions
      'no-cond-assign': 2,
      // disallow sparse arrays
      'no-sparse-arrays': 2,
      // disallow variable or function declarations in nested blocks
      'no-inner-declarations': 2,
      // disallow reassigning exceptions in catch clauses
      'no-ex-assign': 2,
      // disallow duplicate keys in object literals
      'no-dupe-keys': 2,
      // disallow unnecessary boolean casts
      'no-extra-boolean-cast': 2,
      // disallow calling global object properties as functions
      'no-obj-calls': 2,
      // disallow empty block statements
      'no-empty': 2,


      ///////
      // ECMASCRIPT 6
      // These rules relate to ES6, also known as ES2015:
      ///////
      // require super() calls in constructors
      'constructor-super': 2,
      // disallow reassigning const variables
      'no-const-assign': 2,
      // require const declarations for variables that are never reassigned after declared
      'prefer-const': 2,
      // require let or const instead of var
      'no-var': 2,
      // require using arrow functions for callbacks
      'prefer-arrow-callback': 2,
      // require parentheses around arrow function arguments as needed
      'arrow-parens': [2, 'as-needed'],
      // enforce spacing before and after the arrow in arrow functions
      'arrow-spacing': [2, {
        'before': true,
        'after': true
      }
      ],
      // require method and property shorthand syntax for object literals
      'object-shorthand': [2, 'always'],
      // require template literals instead of string concatenation
      'prefer-template': 2,


      ///////
      // STYLISTIC ISSUES
      // These rules relate to style guidelines, and are therefore quite subjective:
      ///////
      // disallow whitespace before properties
      'no-whitespace-before-property': 2,
      // disallow tabs
      'no-tabs': 2,
      // check for indent with 4 spaces
      "indent": [4, 4],
      // enforce consistent spacing before and after semicolons
      'semi-spacing': [2, {
        'before': false,
        'after': true
      }
      ],
      // enforce consistent spacing before and after keywords
      'keyword-spacing': [
        'error', {
          'overrides': {
            'if': {
              'after': true
            },
            'else': {
              'before': true,
              'after': true
            },
            'for': {
              'after': false
            },
            'while': {
              'after': false
            },
            'function': {
              'after': true
            }
          }
        }
      ],
      // enforce consistent spacing before function definition opening parenthesis
      'space-before-function-paren': [2, {
        'anonymous': 'never',
        'named': 'never'
      }
      ],
      // disallow comma dangle
      'comma-dangle': [2, 'never'],
      // enforce consistent comma style to be at the end of statement
      'comma-style': [2, 'last'],
      // enforce consistent spacing before and after commas
      'comma-spacing': ['error', {
        'before': false,
        'after': true
      }
      ],
      // enforce the consistent use of single quotes
      'quotes': [2, 'single', 'avoid-escape'],
      // disallow trailing spaces
      'no-trailing-spaces': 2,
      // disallow if statements as the only statement in else blocks
      'no-lonely-if': 0,
      // require newline at the end of files
      'eol-last': 2,
      // disallow nested ternary expressions
      'no-nested-ternary': 2,
      // enforces zero spaces inside of parentheses
      'space-in-parens': [2, 'never'],
      // enforce consistent brace style for blocks (enforces one true brace style)
      'brace-style': [2, '1tbs', {
        'allowSingleLine': true
      }
      ],
      // enforce consistent spacing inside braces
      'object-curly-spacing': [2, 'always', {
        'objectsInObjects': true,
        'arraysInObjects': true
      }
      ],
      // enforce consistent spacing inside computed property brackets
      'computed-property-spacing': [2, 'never'],
      // enforce spaces inside of blocks after opening block and before closing block
      'block-spacing': [2, 'always'],
      // enforce let to be declared either together, enforce const to be declared separately
      'one-var': [2, {
        'let': 'always',
        'const': 'never'
      }
      ],
      // enforce spaces between the function name and the opening parenthesis that calls it.
      'func-call-spacing': [2, 'always'],
      // turn off spaced comment rule
      'spaced-comment': 0,
      // require quotes around object literal property ass needed
      'quote-props': [2, 'as-needed', {
        'keywords': true
      }
      ]
    },


    ///////
    // GLOBALS
    // Allow specific global variables and methods:
    ///////
    globals: {
      'alert': true,
      'console': true,
      'require': true,
      'window': true,
      'await': true,
      'async': true,
      'process': true,
      'WeakMap': true,
      '__DEV__': true,
      'document': true,
      'navigator': true,
      'location': true,
      'jQuery': true,
      '$': true,
      'module': true,
      'setTimeout': true,
      'clearTimeout': true,
      'Promise': true,
      'Map': true,
      'Set': true
    }
  };
