// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};
