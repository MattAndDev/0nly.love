const { resolve } = require('path')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base')

const conf = {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: 'js/[name]',
    chunkFilename: '[name]',
    path: resolve('./public'),
    publicPath: './'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'js/lib.js',
          test: /node_modules/,
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
}

module.exports = merge(baseConf, conf)
