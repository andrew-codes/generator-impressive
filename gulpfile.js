'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mocha', function () {
    gulp.src(['test/test-*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', function () {
    gulp.run('mocha');
});

