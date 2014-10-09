'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var StepAppender = require('./StepAppender');
var title;

var StepGenerator = module.exports = function StepGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(StepGenerator, yeoman.generators.Base);

StepGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var prompts = [
        {
            name: 'title',
            message: 'What is the title of this slide/step?'
        }
    ];

    this.prompt(prompts, function (props) {
        title = props.title;
        cb();
    }.bind(this));
};

StepGenerator.prototype.runtime = function files() {
    this.id = this._.slugify(title);
    this.filename = this.id + '.md';
    this.appender = new StepAppender(this.id);
    var appPath = process.cwd();
    var fullFileName = path.join(appPath, '/steps/' + this.filename);
    this.copy('step.md', fullFileName);
    var fullPath = path.join(appPath, '/steps/_steps.json');
    var steps = require(fullPath);
    steps = this.appender.appendStepsTo(steps);
    fs.writeFileSync(fullPath, JSON.stringify(steps, null, 4));
};