// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'https://static.asean-go.com/buyer-mis/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    test: {
        env: require('./test.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'https://test-static.asean-go.com/buyer-mis/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8087,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/platform-buyer/api/platform/**': {
                target: 'http://120.77.70.59:8700',
                // target: 'http://120.77.70.65:8700',
                secure: false
            },
            '/common-platform/**': {
                target: 'http://120.77.70.65:8100',
                secure: false
            },
            '/permission/**': {
                target: 'http://120.77.70.65:8080',
                secure: false
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}