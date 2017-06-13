/**
 * @description: dev.js
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/11
 */

"use strict";

module.exports = function (gulp, Plugin, config) {

    // dev html编译
    gulp.task('devhtml', function() {
        var htmlSrc = config.src.html,
            htmlDst = config.output;

        return gulp.src(htmlSrc)
            // .pipe(Plugin.changed(htmlDst))
            .pipe(Plugin.fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            //.pipe(Plugin.useref())
            .pipe(gulp.dest(htmlDst));
            // .pipe(Plugin.notify({ message: 'Htmls task complete' }));
    });

    // dev less 编译
    gulp.task('devless', function () {
        var lessSrc = config.src.less,
            lessDst = config.output + 'css';

        return gulp.src(lessSrc)
            // .pipe(Plugin.changed(lessDst))
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.less())
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(lessDst));
    });

    // dev sass 编译
    gulp.task('devsass', function () {
        var sassSrc = config.src.sass,
            sassDst = config.output + 'css';

        return gulp.src(sassSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(sassDst));

    });

    // dev css 编译
    gulp.task('devcss', function () {
       var cssSrc = config.src.css,
           cssDst = config.output + 'css';

       return gulp.src(cssSrc)
           .pipe(gulp.dest(cssDst));

    });

    // webapack js
    gulp.task('dev:webpack', () => {
        let jsSrc = config.src.js,
            jsDst = config.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.webpackStream(Plugin.webpackConfig, Plugin.webpack))
            .pipe(gulp.dest(jsDst));
    })

    // dev js 编译
    gulp.task('devjs', function () {
        var jsSrc = config.src.js,
            jsDst = config.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.changed(jsDst))
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))

            // 语法检查
            // .pipe(Plugin.jshint('../.jshintrc'))
            // .pipe(Plugin.jshint.reporter('default'))

            // es6
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.babel())
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(jsDst));

    });

    // dev img 编译
    gulp.task('devimg', function(){
        var imgSrc = config.src.img,
            imgDst = config.output + 'img';

        return gulp.src(imgSrc)
            .pipe(Plugin.changed(imgDst))
            .pipe(gulp.dest(imgDst));
    });

    // dev video 编译
    gulp.task('video', function(){
        var videoSrc = config.src.video,
            videoDst = config.output + 'video';

        return gulp.src(videoSrc)
            .pipe(gulp.dest(videoDst));
    });

    // dev font 编译
    gulp.task('font', function(){
        var fontsSrc = config.src.fonts,
            fontsDst = config.output + 'fonts';

        return gulp.src(fontsSrc)
            .pipe(gulp.dest(fontsDst));
    });

    // dev data 编译
    gulp.task('data', function(){
        var dataSrc = config.src.data,
            dataDst = config.output + 'data';

        return gulp.src(dataSrc)
            .pipe(gulp.dest(dataDst));
    });

    // 雪碧图
    gulp.task('sprite', function () {
        var imgSrc = config.src.img,
            imgDst = config.output + 'img';

        var spriteData = gulp.src(config.root + '/src/img/sprite/*.png')
            .pipe(Plugin.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));
        return spriteData.pipe(gulp.dest(imgDst));
    });

    // 清空编译后的文件
    gulp.task('clean', function(cb) {
        var distFile = config.output + '*';

        return Plugin.del(distFile, cb);

    });

    gulp.task('clean:rev', function(cb) {
        var revFile = config.root + '/rev/**/*';

        return Plugin.del(revFile, cb);

    });

    gulp.task('clean:zip', function(cb) {
        var revFile = config.root + '/release/*';

        return Plugin.del(revFile, cb);

    });

    // 默认任务
    gulp.task('default', ['clean'], function(){
        gulp.start('devhtml', 'devsass', 'devcss', 'devless', 'devjs', 'devimg', 'font', 'data');

    });

    // dev watch
    gulp.task('watch', ['browser-sync'],function() {
        gulp.start('devhtml', 'devsass', 'devcss', 'devless', 'devjs', 'devimg', 'font', 'data');

        // watch html
        gulp.watch( config.src.html, function(event){
            gulp.start('devhtml');
            console.log('Event type: ' + event.type);
            console.log('Event path: ' + event.path);

        });

        // watch less
        gulp.watch( config.src.allless, function(){
            gulp.start('devless');
        });

        // watch sass
        gulp.watch( config.src.allsass, function(){
            gulp.start('devsass');
        });

        // watch css
        gulp.watch( config.src.css, function(){
            gulp.start('devcss');
        });

        // watch js
        gulp.watch( config.src.js, function(){
            gulp.start('devjs');
        });

        // watch images
        gulp.watch( config.src.img, function(){
            gulp.start('devimg');
        });

        // watch font
        gulp.watch( config.src.fonts, function(){
            gulp.start('font');
        });

        // watch data
        gulp.watch( config.src.data, function(){
            gulp.start('data');
        });


    });

    // dev webpack
    gulp.task('dev', ['browser-sync'],function() {
        gulp.start('devhtml', 'devsass', 'devcss', 'devless', 'dev:webpack', 'devimg', 'font', 'data');

        // watch js
        gulp.watch( config.src.js, function(){
            gulp.start('dev:webpack');
        });

        // watch html
        gulp.watch( config.src.html, function(event){
            gulp.start('devhtml');
            console.log('Event type: ' + event.type);
            console.log('Event path: ' + event.path);

        });

        // watch less
        gulp.watch( config.src.allless, function(){
            gulp.start('devless');
        });

        // watch sass
        gulp.watch( config.src.allsass, function(){
            gulp.start('devsass');
        });

        // watch css
        gulp.watch( config.src.css, function(){
            gulp.start('devcss');
        });

        // watch images
        gulp.watch( config.src.img, function(){
            gulp.start('devimg');
        });

        // watch font
        gulp.watch( config.src.fonts, function(){
            gulp.start('font');
        });

        // watch data
        gulp.watch( config.src.data, function(){
            gulp.start('data');
        });
    })

};
