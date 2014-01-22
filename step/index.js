'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var StepAppender = require('./StepAppender');

var StepGenerator = module.exports = function StepGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
    console.log('You called the step subgenerator with the argument ' + this.name + '.');
    config = config || require(path.join(process.cwd(), '/config.json'));
    this.id = this._.slugify(this.name);
    this.filename = this.id + '.md';
    this.appender = new StepAppender(this.filename, this.id);
};

util.inherits(StepGenerator, yeoman.generators.NamedBase);

StepGenerator.prototype.files = function files() {
    var appPath = process.cwd();
    var fullfilename = path.join(appPath, '/steps/' + this.filename);
    this.template('step.md', fullfilename);
    var fullPath = path.join(appPath, '/steps/steps.json');
    var steps = require(fullPath);
    steps = this.appender.appendStepsTo(steps);
    fs.writeFileSync(fullPath, JSON.stringify(steps, null, 4));
};