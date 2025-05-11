module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    'react/react-in-jsx-scope': 'off',
  },
  plugins: ['react-hooks'],
};
