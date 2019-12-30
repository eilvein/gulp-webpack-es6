/**
 * @description: release.js
 * @author: lixinwei
 * @version: V1.0.0
 * @update: 17/6/9
 */

'use strict'

module.exports = function(gulp, Plugin, config) {
    // 部署代码copy到部署库
    gulp.task('copy', function() {
        var distFile = config.output + '**/*'
        var releaseFile = config.release

        return gulp.src(distFile).pipe(gulp.dest(releaseFile))
    })

    // 输出压缩文件
    gulp.task('zip', function() {
        var distFile = config.output + '**/*'
        var releaseFile = config.release

        gulp.src(distFile)
            .pipe(Plugin.zip('archive.zip'))
            .pipe(gulp.dest(releaseFile))
    })

    // 部署配置
    var configSSH = {
        host: 'IP',
        port: 22,
        username: 'root',
        password: 'xxxxxxx'
    }
    var gulpSSH = new Plugin.GulpSSH({
        ignoreErrors: false,
        sshConfig: configSSH
    })
    gulp.task('exec', function() {
        return gulpSSH
            .exec(['uptime', 'ls -a', 'pwd'], { filePath: 'commands.log' })
            .pipe(gulp.dest('logs'))
    })

    // 部署到web端
    gulp.task('deploy', function() {
        var fileDst = config.output + '**/*'

        return gulp
            .src(fileDst)
            .pipe(gulpSSH.dest('/roobo/webserver/website/ai/'))
    })

    // 部署到移动端
    gulp.task('deploy-m', function() {
        var fileDst = config.output + '**/*'

        return gulp
            .src(fileDst)
            .pipe(gulpSSH.dest('/roobo/webserver/website/m/'))
    })
}
