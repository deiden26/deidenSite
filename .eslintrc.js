module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "google",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
    },
    "rules": {
        "require-jsdoc": "off",
        "indent": ["error", 4],
    }
};
