module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
    },
};
