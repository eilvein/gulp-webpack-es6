'use strict';
const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.cwd());

module.exports = {
    entry: {
        main: ROOT_PATH + "/src/js/main",
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
            util: path.join(ROOT_PATH, '/src/js/util/util')
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery',
           'window.jQuery': 'jquery'
       }),
       new webpack.optimize.CommonsChunkPlugin({
           name: ['vendors']
       }),
       new webpack.NoEmitOnErrorsPlugin()
    ]
}
