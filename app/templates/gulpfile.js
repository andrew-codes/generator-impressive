'use strict';

var path = require('path');
var gulp = require('gulp');
var refresh = require('gulp-livereload');
var sass = require('gulp-sass');
var express = require("express");
var embedlr = require("gulp-embedlr");
var lr = require('tiny-lr');
var server = lr();

gulp.task("sass", function () {
    gulp.src('./scss/*.scss')
        .pipe(sass({includePaths: ['scss/includes']}))
        .pipe(gulp.dest('./css'))
        .pipe(refresh(server));
});

gulp.task('livereload', function () {
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
    gulp.src("**/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest("./"));
});

gulp.task("connect", function () {
    var app = express();
    app.use(express.query())
        .use(express.bodyParser())
        .use(express.static(path.resolve('./')))
        .use(express.directory(path.resolve('./')))
        .use(lr.middleware({ app: app }))
        .listen(8080);
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', function () {
        gulp.run('sass');
    });
});

gulp.task('default', function () {
    gulp.run('livereload', 'connect', 'watch');
});


