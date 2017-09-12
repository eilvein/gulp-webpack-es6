/**
 * @description: dev.js
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/11
 */

"use strict";

module.exports = function (gulp, Plugin, config) {

    // dev html编译
    gulp.task('devhtml:en', function() {
        var htmlSrc = config.en.html,
            htmlDst = config.en.output;

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
    gulp.task('devless:en', function () {
        var lessSrc = config.en.less,
            lessDst = config.en.output + 'css';

        return gulp.src(lessSrc)
            // .pipe(Plugin.changed(lessDst))
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.less())
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(lessDst));
    });

    // dev sass 编译
    gulp.task('devsass:en', function () {
        var sassSrc = config.en.sass,
            sassDst = config.en.output + 'css';

        return gulp.src(sassSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(gulp.dest(sassDst));

    });

    // dev css 编译
    gulp.task('devcss:en', function () {
       var cssSrc = config.en.css,
           cssDst = config.en.output + 'css';

       return gulp.src(cssSrc)
           .pipe(gulp.dest(cssDst));

    });

    // webapack js
    gulp.task('dev:webpack:en', () => {
        let jsSrc = config.src.js,
            jsDst = config.en.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.webpackStream(Plugin.webpackConfig, Plugin.webpack))
            .pipe(gulp.dest(jsDst));
    })

    // dev js 编译
    gulp.task('devjs:en', function () {
        var jsSrc = config.src.js,
            jsDst = config.en.output + 'js';

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
    gulp.task('devimg:en', function(){
        var imgSrc = config.en.img,
            imgDst = config.en.output + 'img';

        return gulp.src(imgSrc)
            .pipe(Plugin.changed(imgDst))
            .pipe(gulp.dest(imgDst));
    });

    // dev video 编译
    gulp.task('video:en', function(){
        var videoSrc = config.en.video,
            videoDst = config.en.output + 'video';

        return gulp.src(videoSrc)
            .pipe(gulp.dest(videoDst));
    });

    // dev font 编译
    gulp.task('font:en', function(){
        var fontsSrc = config.en.fonts,
            fontsDst = config.en.output + 'fonts';

        return gulp.src(fontsSrc)
            .pipe(gulp.dest(fontsDst));
    });

    // dev data 编译
    gulp.task('data:en', function(){
        var dataSrc = config.en.data,
            dataDst = config.en.output + 'data';

        return gulp.src(dataSrc)
            .pipe(gulp.dest(dataDst));
    });

    // 雪碧图
    gulp.task('sprite:en', function () {
        var imgSrc = config.en.img,
            imgDst = config.en.output + 'img';

        var spriteData = gulp.src(config.root + '/en/img/sprite/*.png')
            .pipe(Plugin.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));
        return spriteData.pipe(gulp.dest(imgDst));
    });

    // 默认任务
    gulp.task('default:en', ['clean'], function(){
        gulp.start('devhtml:en', 'devsass:en', 'devcss:en', 'devless:en', 'devjs:en', 'devimg:en', 'font:en', 'data:en');

    });

    // dev watch
    gulp.task('watch:en', ['browser-sync'],function() {
        gulp.start('devhtml:en', 'devsass:en', 'devcss:en', 'devless:en', 'devjs:en', 'devimg:en', 'font:en', 'data:en');

        // watch html
        gulp.watch( config.en.html, function(event){
            gulp.start('devhtml:en');
            console.log('Event type: ' + event.type);
            console.log('Event path: ' + event.path);

        });

        // watch less
        gulp.watch( config.en.allless, function(){
            gulp.start('devless:en');
        });

        // watch sass
        gulp.watch( config.en.allsass, function(){
            gulp.start('devsass:en');
        });

        // watch css
        gulp.watch( config.en.css, function(){
            gulp.start('devcss:en');
        });

        // watch js
        gulp.watch( config.src.js, function(){
            gulp.start('devjs:en');
        });

        // watch images
        gulp.watch( config.en.img, function(){
            gulp.start('devimg:en');
        });

        // watch font
        gulp.watch( config.en.fonts, function(){
            gulp.start('font:en');
        });

        // watch data
        gulp.watch( config.en.data, function(){
            gulp.start('data:en');
        });


    });

    // dev webpack
    gulp.task('dev:en', ['browser-sync'],function() {
        gulp.start('devhtml:en', 'devsass:en', 'devcss:en', 'devless:en', 'dev:webpack:en', 'devimg:en', 'font:en', 'data:en');

        // watch js
        gulp.watch( config.src.js, function(){
            gulp.start('dev:webpack:en');
        });

        // watch html
        gulp.watch( config.en.html, function(event){
            gulp.start('devhtml:en');
            console.log('Event type: ' + event.type);
            console.log('Event path: ' + event.path);

        });

        // watch less
        gulp.watch( config.en.allless, function(){
            gulp.start('devless:en');
        });

        // watch sass
        gulp.watch( config.en.allsass, function(){
            gulp.start('devsass:en');
        });

        // watch css
        gulp.watch( config.en.css, function(){
            gulp.start('devcss:en');
        });

        // watch images
        gulp.watch( config.en.img, function(){
            gulp.start('devimg:en');
        });

        // watch font
        gulp.watch( config.en.fonts, function(){
            gulp.start('font:en');
        });

        // watch data
        gulp.watch( config.en.data, function(){
            gulp.start('data:en');
        });
    })

};
