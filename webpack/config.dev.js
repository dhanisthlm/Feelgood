var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist', 'client', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    function () {
      this.plugin('done', function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log(stats.compilation.errors)
          process.exit(1)
        }
      })
    }
  ],
  resolve: {
    alias: {}
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '..', 'src')
      },
        { test: /\.css/, loader: "style-loader!css-loader" },
        { test: /\.png/, loader: "url-loader?limit=100000&mimetype=image/png" },
        { test: /\.woff/, loader: "url-loader?limit=100000"},
        { test: /\.woff2/, loader: "url-loader?limit=100000"},
        { test: /\.ttf/, loader: "file-loader"},
        { test: /\.eot/, loader: "file-loader"}
    ]
  },
    node: 'empty',
    tls: 'empty',
    dns: 'empty'
};
