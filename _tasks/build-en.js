/**
 * @description: build.js
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/12
 */

"use strict";

module.exports = function (gulp, Plugin, config) {

    // release img
    gulp.task('relimg:en', function(){
        var imgSrc = config.en.img,
            imgDst = config.en.output + 'img';

        return gulp.src(imgSrc)
            .pipe(Plugin.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [Plugin.pngquant()]
            }))
            .pipe(gulp.dest(imgDst));

    });
    //release less
    gulp.task('relless:en', function () {
        var lessSrc = config.en.less,
            lessDst = config.en.output + 'css';

        return gulp.src(lessSrc)
        //.pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.less())

            .pipe(Plugin.cleanCSS({debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + '.min: ' + details.stats.minifiedSize);
            }))

            //.pipe(Plugin.sourcemaps.write('./maps'))

            .pipe(Plugin.rev())
            .pipe(gulp.dest(lessDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest(config.root + '/rev/en/less' ));
    });

    //release sass
    gulp.task('relsass:en', function () {
        var sassSrc = config.en.sass,
            sassDst = config.en.output + 'css';

        return gulp.src(sassSrc)
            //.pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            //.pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(Plugin.rev())
            //.pipe(Plugin.minifycss())
            .pipe(gulp.dest(sassDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest( config.root + '/rev/en/sass' ));

    });

    //release html
    gulp.task('relhtml:en', function(){
        var htmlSrc = config.en.relhtml,
            htmlDst = config.en.output;

        return gulp.src(htmlSrc)
            .pipe(Plugin.fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(Plugin.revCollector())
            .pipe(gulp.dest(htmlDst));

    });

    //release css
    gulp.task('relcss:en', function(){
        var cssSrc = config.en.css,
            cssDst = config.en.output + 'css';


        return gulp.src(cssSrc)
        //.pipe(Plugin.concat('all.css'))
        // .pipe(gulp.dest(cssDst))
        // .pipe(Plugin.rename({ suffix: '.min' }))
            .pipe(Plugin.cleanCSS())
            .pipe(Plugin.rev())
            .pipe(gulp.dest(cssDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest( config.root + '/rev/en/css' ));

    });

    // webapack js
    gulp.task('rel:webpack:en', () => {
        let jsSrc = config.src.js,
            jsDst = config.en.output + 'js';

        return gulp.src(jsSrc)
            .pipe(Plugin.plumber({errorHandler: Plugin.notify.onError('Error: <%= error.message %>')}))
            .pipe(Plugin.webpackStream(Plugin.webpackConfig, Plugin.webpack))
            .pipe(Plugin.stripDebug())
            .pipe(Plugin.uglify())
            .pipe(Plugin.rev())
            .pipe(gulp.dest(jsDst))
            .pipe(Plugin.rev.manifest())
            .pipe(gulp.dest( config.root + '/rev/en/js' ));
    })

    //relese js
    gulp.task('reljs:en', function (cb) {
        var jsSrc = config.src.js,
            jsDst = config.en.output + 'js';

        Plugin.pump([
                gulp.src(jsSrc),
                // 语法检查
                // Plugin.jshint('../.jshintrc'),
                // Plugin.jshint.reporter('default'),

                Plugin.babel(),
                // 去掉console和debugger
                Plugin.stripDebug(),
                // Plugin.rename({ suffix: '.min' }),

                // 压缩
                Plugin.uglify(),

                Plugin.rev(),
                gulp.dest(jsDst),
                Plugin.rev.manifest(),
                gulp.dest( config.root + '/rev/en/js' )
            ],
            cb
        );

    });

    //release code
    gulp.task('release:en', ['clean', 'clean:rev'], function(){
        gulp.start('relimg:en','relsass:en', 'relcss:en', 'relless:en', 'relsass:en', 'reljs:en');
    });

    // build code
    gulp.task('build:en', ['browser-sync'], function() {
        gulp.start('relhtml:en');

    });

    //release code
    gulp.task('webpack:release:en', function(){
        gulp.start('relimg:en','relsass:en', 'relcss:en', 'relless:en', 'relsass:en', 'rel:webpack:en');
    });


};
