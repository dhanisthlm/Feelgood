var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '..', 'dist', 'client', 'static'),
        filename: 'bundle.js',
        publicPath: './static/'
    },
    plugins: [
        new webpack.IgnorePlugin(/locale/, /moment$/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('stage'),
            'process.env.RAVEN_ENV': JSON.stringify('stage'),
            'process.env.npm_package_version': JSON.stringify(require('../package.json').version),
            'process.env.BROWSER': true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    resolve: {
        alias: {
            'joi': 'joi-browser'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [
                    path.join(__dirname, '..', 'src'),
                    path.join(__dirname, '..', 'server/config'),
                    path.join(__dirname, '..', 'helpers'),
                    path.join(__dirname, '..', 'validators')
                ]
            },
            { test: /\.css/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: 'url-loader?limit=100000' },
            { test: /\.jpg$/, loader: 'file-loader' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    node: {
        tls: 'empty',
        dns: 'empty',
        net: 'empty'
    }
};
