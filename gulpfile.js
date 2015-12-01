/* globals require, runSequence*/
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	karma = require('karma');

gulp.task('default', ['sass', 'test'], function() {
});
gulp.task('watch', ['browserSync', 'sass'], function (){
	'use strict';
	gulp.watch('./app/components/**/*.scss', ['sass']);
});
gulp.task('test', function (done){
	karma.server.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
	}, function (code){
		if (code === 1) {
			console.log("Unit test failures");
		} else {
			console.log("Unit tests passed!");
			done();
		}
	});
});
gulp.task('sass', function () {
	'use strict';
	gulp.src(['!./app/components/main/base.scss','./app/components/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('browserSync', function() {
	'use strict';
	browserSync({
		proxy: "localhost:81/maff/app"
	});
});