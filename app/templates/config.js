/*global require, module*/
'use strict';

var util = require('util');
var pkg = require('./package.json');

var dest = './dist';
var config = {
    name: pkg.name,
    dest: dest,
    browserSync: {
        server: {
            baseDir: [dest]
        },
        files: [
                dest + "/**",
                "!" + dest + "/**.map"
        ]
    },
    markup: {
        src: 'web/index.html.mustache',
        dest: dest,
        steps: 'steps/*.md'
    },
    styles: {
        src: 'styles/index.less',
        dest: dest,
        outputName: 'index.css',
        prefixer: {
            browsers: ['last 2 versions']
        }
    },
    scripts: {
        debug: false,
        extensions: ['.coffee', '.js'],
        transforms: [
            ['coffeeify']
        ],
        bundleConfig: {
            entries: util.format('./scripts/index.js'),
            dest: dest,
            outputName: 'index.js'
        }
    }
};
module.exports = config;