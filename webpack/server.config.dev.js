const nodeExternals = require('webpack-node-externals');
const IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExternalsPlugin = require('webpack-externals-plugin');
const path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, '..', 'src/server/index'),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/dist/',
        filename: 'server.js',
        library: 'root',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        modules: [
            path.join(__dirname, '..', 'src', 'components')
        ],
        extensions: ['.js', '.css'],
        alias: {
            'joi': 'joi-browser'
        }
    },
    plugins: [
        new ExtractTextPlugin("/client/css/styles.css"),
        new ExternalsPlugin({
            type: "commonjs",
            include: `${__dirname}/node_modules/`,
        }),
        new webpack.EnvironmentPlugin({
          'NODE_ENV': 'development',
          'BROWSER': false
        }),
        new webpack.DefinePlugin({
          'process.env.BROWSER': false
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /\/node_modules\//,
                include: [
                    path.join(__dirname, '..', 'src'),
                    path.join(__dirname, '..', 'server/config'),
                    path.join(__dirname, '..', 'helpers'),
                    path.join(__dirname, '..', 'validators')
                ]
            },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) },
            { test: /\.png/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.woff/, loader: "url-loader?limit=100000"},
            { test: /\.woff2/, loader: "url-loader?limit=100000"},
            { test: /\.ttf/, loader: "file-loader"},
            { test: /\.eot/, loader: "file-loader"},
            { test: /\.json$/, loader: 'json-loader' },
        ]
    }
};