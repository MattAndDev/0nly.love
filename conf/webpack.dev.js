const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConf = require('./webpack.base')

const conf = {
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  devtool: 'sourcemaps'
}

module.exports = merge(baseConf, conf)
