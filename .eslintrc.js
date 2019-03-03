module.exports = {
    rules: {
        "prefer-arrow-callback": "error",
        "no-param-reassign": [
            "error", { "props": true, "ignorePropertyModificationsFor": ["sortOpts", "filterOpts"] }
        ],
        "func-names": ["error", "never"]
    }
};