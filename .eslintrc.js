module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "no-unused-vars": ["error", { "varsIgnorePattern": "^(Map)|(List)$", "args": "none" }]
    }
};