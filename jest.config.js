module.exports = {
  transform: {
    '^.+\\.js(x)?$': '<rootDir>/jest/babel-transformer.js',
    '^.+\\.css$': 'identity-obj-proxy'
  },
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy'
  },
  snapshotSerializers: [
    'jest-serializer-html-string'
  ]
}
