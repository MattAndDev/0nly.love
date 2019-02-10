module.exports = {
  extends: ['standard', 'standard-preact'],
  plugins: ['babel', 'jest'],
  env: {
    browser: true,
    'jest/globals': true
  },
};
