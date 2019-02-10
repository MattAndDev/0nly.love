module.exports = {
  presets: [
    [
      '@babel/preset-env', 
      { modules: false }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { 'pragma':'h' }],
    '@babel/plugin-proposal-class-properties'
  ]
}
