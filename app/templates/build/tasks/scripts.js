'use strict';


var gulp = require('gulp');
var browserify = require('browserify');
var config = require('./../../config').scripts;
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');

gulp.task('scripts', [], function (callback) {
    var browserifyThis = function (bundleConfig) {
        var bundler = browserify({
            cache: {},
            packageCache: {},
            fullPaths: true,
            entries: bundleConfig.entries,
            transforms: config.transforms,
            debug: config.debug
        });

        var bundle = function () {
            bundleLogger.start(bundleConfig.outputName);
            return bundler
                .bundle()
                .on('error', handleErrors)
                .pipe(source(bundleConfig.outputName))
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished);
        };
        bundler = watchify(bundler);
        bundler.on('update', bundle);

        function reportFinished() {
            bundleLogger.end(bundleConfig.outputName);
            callback();
        }

        bundle();
    };
    return browserifyThis(config.bundleConfig);
});
