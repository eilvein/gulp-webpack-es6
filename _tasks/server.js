/**
 * @description: server.js
 * @author: lixinwei
 * @version: V1.0.2
 * @update: 16/4/12
 */

module.exports = function (gulp, Plugin, config) {

    // 静态服务器
    gulp.task('browser-sync', function(){

        Plugin.browserSync.init({
            files: config.output + '**',
            //proxy: "yourlocal.com",
            server:{
                baseDir: config.output
            }
        });

    });


};
