let config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env.NODE_ENV

let path = require('path')
let express = require('express')
let webpack = require('webpack')
let opn = require('opn')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = require('./webpack.dev.conf')

let port = process.env.PORT || config.dev.port
let proxyTable = config.dev.proxyTable

let app = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

let hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
})


module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  let uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
