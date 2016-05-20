/*!
 * @description:组件安装 npm install gulp-xxxx --save-dev
 * @version: V1.0
 * @author: Eilvein
 * @update:
 */

'use strict';

// 引入 gulp及组件
var gulp = require('gulp'),                    //基础库

    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),                 //ftp
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-sass'),               //sass
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify = require('gulp-uglify'),           //js压缩
    rename = require('gulp-rename'),           //重命名
    concat = require('gulp-concat'),           //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    notify = require("gulp-notify"),           //提示
    stripDebug = require('gulp-strip-debug'),  //去掉console和debugger
    useref = require('gulp-useref'),
    fileinclude = require('gulp-file-include'), //html include
    rev = require('gulp-rev'), //对文件名加MD5后缀
    revReplace = require('gulp-rev-replace'), //替换引用的加了md5后缀的文件名
    del = require('del'),  //删除
    browserSync = require('browser-sync').create(),
    gulpif = require('gulp-if'); //if判断，用来区别生产环境还是开发环境的

var webpack = require("webpack");
var stream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

// 任务处理的文件路径配置
var paths = {
    js: [
        './src/js/**/*.js'
    ],
    css: [
        './src/css/**/*.css'
    ],
    sass: [
        './src/sass/**/*.scss'
    ],
    img: [
        './src/img/**/*'
    ],
    html: [
        './src/**/*.html'
    ],
    data: [
        './src/data/*'
    ],
    fonts: [
        './src/font/**/*'
    ]
};

var output = "./assets/"; // output

gulp.task('webpack', function(callback) {
    var myConfig = Object.create(webpackConfig);
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", 'webpack is  OK!');
        callback(); 
    })

});


gulp.task('packjs',function () {
  gulp.src('./src/js/**/*.js')
    .pipe(stream(webpackConfig))
    .pipe(gulp.dest('./assets/js'));
});






// HTML处理
gulp.task('htmlDev', function() {
    var htmlSrc = paths.html,
        htmlDst = output;

    return gulp.src(htmlSrc)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(htmlDst));
        //.pipe(notify({ message: 'Htmls task complete' }));
});

// sass处理
gulp.task('sass', function () {
    var sassSrc = paths.sass,
        sassDst = output + '/css/',
        cssSrc  = "./src/css/";

    return gulp.src(sassSrc)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(sassDst))
        .pipe(gulp.dest(cssSrc));
        //.pipe(notify({ message: 'Scss task completed!' }));

});

// css处理
gulp.task('cssDev', function () {
    var cssSrc = paths.css,
        cssDst = output + '/css';

    return gulp.src(cssSrc)
        .pipe(gulp.dest(cssDst));

});

// js处理
gulp.task('jsDev', function () {
    var jsSrc = paths.js,
        jsDst = output + '/js';

    return gulp.src(jsSrc)
        .pipe(stream(webpackConfig))
        .pipe(gulp.dest(jsDst));
        //.pipe(notify({ message: 'Scripts task complete' }));

});

// 图片处理
gulp.task('imgDev', function(){
    var imgSrc = paths.img,
        imgDst = output + '/img';

    return gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
        //.pipe(notify({ message: 'Images task complete' }));
});

// data处理
gulp.task('data', function() {
    var dataSrc = paths.data,
        dataDst = output + '/data';

    return gulp.src(dataSrc)
        .pipe(gulp.dest(dataDst));

});

//fonts处理
gulp.task('fonts', function(){
    var fontsSrc = paths.fonts,
        fontsDst = output + '/font';

    return gulp.src(fontsSrc)
        .pipe(gulp.dest(fontsDst));
});

//上传发布后文件到ftp
gulp.task('ftp', function () {
    var fileDst = output + '/**/*';

    return gulp.src(fileDst)
        .pipe(ftp({
            host: '172.16.16.252',
            user: 'licaiftp',
            pass: 'licaiftp',
            remotePath: '/img'
        }))
        .pipe(gutil.noop());
});

//browser-sync
gulp.task('browser-sync', function(){

    browserSync.init({
        files: "./assets/**",
        //proxy: "yourlocal.dev",
        server:{
           baseDir: "assets"
        }
    });

});


// 清空编译后的文件
gulp.task('clean', function() {

    return del(['assets']);

});

// 开发环境
gulp.task('watch', ['browser-sync'],function() {
    gulp.start('htmlDev', 'cssDev', 'jsDev', 'imgDev', 'fonts', 'data', 'sass');

    // 监听html
    gulp.watch( paths.html, function(event){
        gulp.start('htmlDev');
        console.log('Event type: ' + event.type);
        console.log('Event path: ' + event.path);
    });

    // 监听sass
    gulp.watch( paths.sass, function(){
        gulp.start('sass');
    });

    // 监听css
    gulp.watch( paths.css, function(){
        gulp.start('cssDev');
    });

    // 监听js
    gulp.watch( paths.js, function(){
        gulp.start('jsDev');
    });

    // 监听images
    gulp.watch( paths.img, function(){
        gulp.start('imgDev');
    });

    // 监听data
    gulp.watch( paths.data, function(){
        gulp.start('data');
    });

});


//部署css
gulp.task('css-p', function(){

    return gulp.src(paths.css)
        //.pipe(concat('wap_base.css'))
        .pipe(gulp.dest(output + '/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(output + '/css'));
});

//部署js
gulp.task('js-p', function(){
    return gulp.src(paths.js)
        // 语法检查
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        // 合并文件
        //.pipe(concat('main.js'))

        //.pipe(stripDebug())

        .pipe(gulp.dest(output + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(output + '/js'));
});

//部署img
gulp.task('img-p', function(){
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(output + '/img'));
});

//部署html
gulp.task('html-p', function(){
    return gulp.src(paths.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(output));
});

/* 部署环境 */
gulp.task('release', ['browser-sync'], function() {

    gulp.start('css-p', 'js-p', 'img-p', 'html-p');

    // 发布监听css
    gulp.watch( paths.css, ['css-p']);

    // 发布监听js
    gulp.watch( paths.js, ['js-p']);

    // 发布监听img
    gulp.watch( paths.img, ['img-p']);

    // 发布监听html
    gulp.watch( paths.html, ['html-p']);

    // 发布监听fonts
    gulp.watch( paths.fonts, ['fonts']);

});

// help
gulp.task('help',function () {

    console.log('	gulp release        文件部署');

    console.log('	gulp watch          开发监控');

    console.log('	gulp help           gulp参数说明');

    console.log('	gulp ftp            上传部署文件到ftp服务器');

    console.log('	gulp clean          清除部署css，js，images');

    console.log('	gulp -m <module>    部分模块打包（默认全部打包）');

});
