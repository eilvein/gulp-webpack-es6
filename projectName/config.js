/**
 * @description: config.js
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/12
 */

"use strict";

var path = require('path');
var ROOT_PATH = path.resolve(process.cwd());


module.exports = function(){
    var config = {
        src: {
            html: [
                'src/*.html',
                'src/templates*/*.html',
                'src/favicon.png'
            ],
            relhtml: [
                'rev/**/*.json',
                'src/*.html',
                'src/favicon.png'
            ],
            less: [
                'src/less/*.less'
            ],
            allless: [
                'src/less/**/*.less'
            ],
            sass: [
                'src/sass/*.scss'
            ],
            allsass: [
                'src/sass/**/*.scss'
            ],
            css: [
                'src/css/**/*.css'
            ],
            js: [
                'src/js/**/*.js'
            ],
            img: [
                'src/img/**/*'
            ],
            fonts: [
                'src/fonts/**/*'
            ],
            data: [
                'src/data/**/*'
            ]
        },
        output: 'dist/',
        input: 'src/',
        root: ROOT_PATH,
        release:'../release/',
        en: {
            html: [
                'en/*.html',
                'en/templates*/*.html',
                'en/favicon.png'
            ],
            relhtml: [
                'rev/**/*.json',
                'en/*.html',
                'en/favicon.png'
            ],
            less: [
                'en/less/*.less'
            ],
            allless: [
                'en/less/**/*.less'
            ],
            sass: [
                'en/sass/*.scss'
            ],
            allsass: [
                'en/sass/**/*.scss'
            ],
            css: [
                'en/less/**/*.css'
            ],
            js: [
                'en/js/**/*.js'
            ],
            img: [
                'en/img/**/*'
            ],
            fonts: [
                'en/fonts/**/*'
            ],
            data: [
                'en/data/**/*'
            ],
            output: 'dist/en/',
            input: 'en/',
            root: ROOT_PATH,
            release:'../release/en/'
        }
    };

    return config;
};
