let path = require('path')
let config = require('../config')
let utils = require('./utils')

let NODE_ENV = process.env.NODE_ENV
let cssSourceMapDev = (NODE_ENV === 'development' && config.dev.cssSourceMap)
let cssSourceMapProd = (NODE_ENV === 'production' && config.build.productionSourceMap)
let useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].[hash:8].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
    }
  },
  resolveLoader: {},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    },{
      test: /\.(less|css)$/,
      loader: 'style!css!less',
      exclude: /node_modules/,
    },{
      test: /\.json$/,
      loader: 'json'
    },{
      test: /\.(?:png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },{
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
}