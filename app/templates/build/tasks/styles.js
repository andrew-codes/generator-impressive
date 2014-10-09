'use strict';

var gulp = require('gulp');
var preprocessor = require('gulp-less');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var config = require('./../../config').styles;

gulp.task('styles', [], function () {
    return  styles(gulp.src(config.src))
        .pipe(watch(config.src, function(stream){
            return styles(stream);
        }));
});

function styles(stream) {
    return stream
        .pipe(preprocessor())
        .pipe(prefixer(config.prefixer))
        .pipe(gulp.dest(config.dest));
}