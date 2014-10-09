'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('./../../config');
var markupConfig = config.markup;
var stylesConfig = config.styles;
var scriptsConfig = config.scripts;
var Promise = require('bluebird');
var join = Promise.join;
var fs = Promise.promisifyAll(require('fs'));
var mkdir = Promise.promisifyAll(require('mkdirp'));
var util = require('util');
var mustache = require('mustache');
var _ = require('underscore');
var through = require('through');
var markupify = through(markup);
markupify.autoDestory = false;
var marked = require('marked');
var highlighter = new (require('highlights'))();

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    smartypants: true,
    highlight: function (code) {
        return highlighter.highlightSync({fileContents: code});
    }
});

gulp.task('markup', [], function () {
    return gulp.src(markupConfig.src)
        .pipe(markupify)
        .pipe(watch(markupConfig.steps, function (stream) {
            return stream
                .pipe(markupify);
        }));
});

function markup() {
    return fs.readFileAsync(markupConfig.src)
        .then(function (fileContents) {
            return fileContents.toString();
        })
        .then(function (fileContents) {
            return createViewModel()
                .then(function (vm) {
                    var contents = mustache.render(fileContents, vm);
                    return mkdir.mkdirpAsync(markupConfig.dest)
                        .thenReturn(markupConfig.dest)
                        .then(function (dirName) {
                            return fs.writeFileAsync(util.format('%s/index.html', dirName), contents, 'utf-8');
                        });
                });
        });
}

function createViewModel() {
    var steps = [];
    return fs.readFileAsync('./steps/_steps.json')
        .then(function (fileContents) {
            return JSON.parse(fileContents);
        })
        .then(function (steps) {
            var stepPromises = _.map(steps, function (step) {
                return fs.readFileAsync(util.format('steps/%s', step.uri))
                    .then(function (fileContents) {
                        return {
                            id: step.id,
                            className: step.className,
                            content: marked(fileContents.toString())
                        };
                    })
                    .then(function (stepVm) {
                        stepVm.data = _.map(Object.keys(step.data), function (key) {
                            return {
                                name: key,
                                value: step.data[key]
                            };
                        });
                        steps.push(stepVm);
                        return stepVm;
                    });
            });
            return Promise.all(stepPromises)
                .then(function () {
                    return {
                        js: 'index.js',
                        css: 'index.css',
                        title: config.name,
                        steps: steps
                    };
                });
        });
}