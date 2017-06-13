/**
 * @description: mocha
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/13
 */

"use strict";
module.exports = function (gulp, Plugin, config) {

    // 测试框架
    gulp.task('mocha', function () {
        return gulp.src(config.src.js, {read: false})
            // gulp-mocha needs filepaths so you can't have any plugins before it
            .pipe(
                Plugin.mocha({
                    reporter: 'nyan'
                })
            );
    });

};