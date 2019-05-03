const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
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
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};