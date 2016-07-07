module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        "no-use-before-define": ["error", { "functions": true, "classes": true }],
        "no-param-reassign": [{ "props": true }],
    }
};