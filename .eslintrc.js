module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['vue', 'import'],
  rules: {
    // Vue
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'error',
    'vue/attributes-order': 'warn',
    'vue/order-in-components': 'warn',
    'vue/no-unused-vars': 'error',
    'vue/no-mutating-props': 'error',

    // JS
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',

    // Import
    'import/no-unresolved': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['*.config.js', '*.config.mjs', 'scripts/**/*.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
