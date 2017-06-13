/**
 * @description:gulpfile.js
 * @author:lixinwei
 * @version: V1.0.2
 * @update:16/7/25
 * @install: npm install gulp-xxxx --save-dev
 */

'use strict';

// 引入 gulp及组件
var gulp = require('gulp'),
	fs = require('fs'),
	path = require('path'),
 	gulpLoadPlugins = require('gulp-load-plugins'),
	gulpTaskList = fs.readdirSync('../_tasks/');

var _PATH = path.resolve(__dirname);
var config = require(_PATH + '/config')();

gulpLoadPlugins.fileinclude = require('gulp-file-include');     //html include
gulpLoadPlugins.less = require('gulp-less');                    //less
gulpLoadPlugins.sourcemaps = require('gulp-sourcemaps');	    //maps
gulpLoadPlugins.notify = require("gulp-notify");                //提示
gulpLoadPlugins.sass = require('gulp-sass');                    //sass
gulpLoadPlugins.gutil = require('gulp-util');                   //自定义方法
gulpLoadPlugins.ftp = require('gulp-ftp');                      //ftp
gulpLoadPlugins.del = require('del');                           //删除
gulpLoadPlugins.browserSync = require('browser-sync').create();	//browserSync
gulpLoadPlugins.mocha = require('gulp-mocha');	 				//测试框架
gulpLoadPlugins.concat = require('gulp-concat');                //合并文件
gulpLoadPlugins.rename = require('gulp-rename');                //重命名
gulpLoadPlugins.jshint = require('gulp-jshint');                //js检查
gulpLoadPlugins.uglify = require('gulp-uglify');                //js压缩
gulpLoadPlugins.pump = require('pump');                         //pump
gulpLoadPlugins.stripDebug = require('gulp-strip-debug');       //去掉console和debugger
gulpLoadPlugins.imagemin = require('gulp-imagemin');            //图片压缩
gulpLoadPlugins.pngquant = require('imagemin-pngquant');        //图片处理
gulpLoadPlugins.spritesmith = require('gulp.spritesmith');      //雪碧图
gulpLoadPlugins.GulpSSH = require('gulp-ssh');                  //push测试服务器
gulpLoadPlugins.useref = require('gulp-useref');
gulpLoadPlugins.plumber = require('gulp-plumber');              //捕获错误
gulpLoadPlugins.gulpif = require('gulp-if');                    //if判断
gulpLoadPlugins.babel = require("gulp-babel");                  //ES6
gulpLoadPlugins.changed = require('gulp-changed');              //编译修改的
gulpLoadPlugins.rev = require('gulp-rev');
gulpLoadPlugins.revCollector = require('gulp-rev-collector');
gulpLoadPlugins.cleanCSS = require('gulp-clean-css');          	//css压缩
gulpLoadPlugins.zip = require('gulp-zip');          			//输出压缩包

gulpLoadPlugins.webpack = require('webpack');
gulpLoadPlugins.webpackStream = require('webpack-stream');
gulpLoadPlugins.webpackConfig = require('../webpack.config');



gulpTaskList.forEach(function(taskfile) {
	if (taskfile.split('.').pop().toLowerCase() === 'js') {
		require('../_tasks/' + taskfile)(gulp, gulpLoadPlugins, config);
	}
});


// gulp help
gulp.task('help',function () {
	console.log('---------------------------------------');
	console.log('');
	console.log('	gulp help             gulp参数说明');
	console.log('');
	console.log('	# 开发监听（老程序开发）');
	console.log('	gulp watch            开发环境');
	console.log('');
	console.log('	# 开发监听（webpack）');
	console.warn('	gulp dev              开发环境');
	console.log('');
	console.log('	# 部署编译（老程序生产）');
	console.log('	gulp release          静态文件生产');
	console.log('	gulp build            模拟生成环境');
	console.log('');
	console.log('	# 部署编译（webpack生成）');
	console.log('	gulp webpack:release  静态文件生产');
	console.log('	gulp build            模拟生成环境');
	console.log('');
	console.log('	# 测试环境部署');
	console.log('	gulp deploy           部署测试服务机器');
	console.log('');
	console.log('	# 其他常用操作');
	console.log('	gulp clean            清除dist文件');
	console.log('	gulp clean:rev        清除rev文件');
	console.log('	gulp clean:zip        清除zip文件');
	console.log('	gulp ftp              上传ftp服务器');
	console.log('	gulp sprite           雪碧图');
	console.log('	gulp mocha            测试框架');
	console.log('	gulp zip              输出压缩文件');
	console.log();
	console.log('---------------------------------------');

});
