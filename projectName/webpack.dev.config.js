'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('../webpack.base.config');
const ROOT_PATH = path.resolve(process.cwd());

const devConfig = webpackMerge(webpackBaseConf, {
    entry: {
        main: ROOT_PATH + "/src/js/main",
        pxtorem: ROOT_PATH + "/src/js/components/pxtorem"
    }
});

module.exports = devConfig;
