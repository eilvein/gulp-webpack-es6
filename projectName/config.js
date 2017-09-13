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
                'src-en/*.html',
                'src-en/templates*/*.html',
                'src-en/favicon.png'
            ],
            relhtml: [
                'rev/**/*.json',
                'src-en/*.html',
                'src-en/favicon.png'
            ],
            less: [
                'src-en/less/*.less'
            ],
            allless: [
                'src-en/less/**/*.less'
            ],
            sass: [
                'src-en/sass/*.scss'
            ],
            allsass: [
                'src-en/sass/**/*.scss'
            ],
            css: [
                'src-en/less/**/*.css'
            ],
            js: [
                'src-en/js/**/*.js'
            ],
            img: [
                'src-en/img/**/*'
            ],
            fonts: [
                'src-en/fonts/**/*'
            ],
            data: [
                'src-en/data/**/*'
            ],
            output: 'dist/en/',
            input: 'src-en/',
            root: ROOT_PATH,
            release:'../release/en/'
        }
    };

    return config;
};
