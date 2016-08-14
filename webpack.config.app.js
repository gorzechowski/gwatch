var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: "./renderer.js",
    output: {
        path: path.join( __dirname, 'dist/'),
        filename: "app.js"
    },
    target: 'electron',
    module: {
        loaders: [
            {
                test: /\.js|\.jsx/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.(mp3|ogg)$/,
                loader: "file"
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
        // new webpack.optimize.UglifyJsPlugin({
            // compress: {
                // warnings: false
            // }
        // }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                html5: true
            }
        })
    ],
    devtool: 'source-map'
};
