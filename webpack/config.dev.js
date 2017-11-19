var path = require('path')
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'inline-source-map',
  target: 'node', // webpack should emit node.js compatible code
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
      new webpack.IgnorePlugin(/jsdom/),
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
  externals: [nodeExternals()],
  resolve: {
    alias: {}
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /\/node_modules\//,
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
