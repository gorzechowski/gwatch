var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'main'),
    entry: "./main.js",
    output: {
        path: path.join( __dirname, 'dist/'),
        filename: "main.js"
    },
    target: 'electron',
    node: {
        __dirname: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                loader: "file",
                query: {
                    name: '[name].[ext]'
                }
            }
        ]
    }
};
