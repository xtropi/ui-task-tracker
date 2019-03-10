module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "prettier", "prettier/react"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "react/jsx-filename-extension": [
            1,
            {
              "extensions": [".js", ".jsx"]
            }
          ],
        "react/prop-types": 0,
        "no-underscore-dangle": 0,
        "quotes": [
            "error",
            "single"
          ],
        "jsx-quotes": [
            "error",
            "prefer-single"
          ],
        "indent": ["error", "tab"],
        "no-multi-spaces": "error",
    }
};