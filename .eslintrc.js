module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "ignorePatterns": ["./dist/**.*"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "overrides": [],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "import"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "react/react-in-jsx-scope": "off",
        "no-use-before-define": "error",
        "import/order": [
            "error",
            {
                "pathGroups": [
                    {
                        "pattern": "@/**",
                        "group": "internal",
                        "position": "after"
                    }
                ],
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "unknown",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type"
                ],
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc"
                }
            }
        ],
        "import/no-unresolved": "off",
        "prefer-const": "error",
        "comma-dangle": ["error", "never"],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/typedef": ["error", {
            "arrayDestructuring": false,
            "arrowParameter": false,
            "memberVariableDeclaration": false,
            "objectDestructuring": false,
            "parameter": true,
            "propertyDeclaration": true,
            "variableDeclaration": false,
            "variableDeclarationIgnoreFunction": true
        }],
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowExpressions": true
        }],
        "@typescript-eslint/no-inferrable-types": ["error", {
            "ignoreParameters": true,
            "ignoreProperties": false
        }],
        "@typescript-eslint/no-non-null-assertion": "off"
    }
};
