'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./../../config');
var browserSyncConfig = config.browserSync;
var dest = config.dest;

gulp.task('browserSync', [], function () {
    return browserSync(browserSyncConfig);
});