const TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devServer: {
        contentBase: "./public",
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new BaseHrefWebpackPlugin({ baseHref: '/' }),
        new HtmlWebpackRootPlugin(),
    ],
    // file: webpack.config.js
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel-loader", 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};