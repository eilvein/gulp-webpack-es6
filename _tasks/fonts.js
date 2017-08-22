
"use strict";

module.exports = function (gulp, Plugin, config) {

    function minifyFont(text, cb) {
        gulp
            .src(config.src.fonts)
            .pipe(Plugin.fontmin({
                text: text
            }))
            .pipe(gulp.dest(config.output + 'fonts'))
            .on('end', cb);
    }

    gulp.task('fonts', function (cb) {

        var buffers = [];

        gulp
            .src('src/*.html')
            .on('data', function (file) {
                buffers.push(file.contents);
            })
            .on('end', function () {
                var text = Buffer.concat(buffers).toString('utf-8');
                minifyFont(text, cb);
            });

    });

};
