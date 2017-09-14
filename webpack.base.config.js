'use strict';
const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.cwd());

const config = {
    entry: {
        vendors:['jquery', 'util']
    },
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }],
            exclude: path.resolve(__dirname, 'node_modules')
        }]
    },
    resolve:{
        extensions: ['.js'],
        alias: {
            jquery: path.join(ROOT_PATH, '/src/js/vendor/2.2.1/jquery'),
            util: path.join(ROOT_PATH, '/src/js/util/util'),
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery',
           'window.jQuery': 'jquery'
       }),
       new webpack.optimize.CommonsChunkPlugin({
           name: 'vendors',
        //    filename: 'vendors.[hash].js',
           minChunks: Infinity
       }),
       new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
