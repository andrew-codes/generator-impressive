'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');
var glob = require('glob');
var util = require('util');

var PresentationGenerator = module.exports = function PresentationGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(PresentationGenerator, yeoman.generators.Base);

PresentationGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'presentationTitle',
            message: 'What is the title of this presentation?'
        }
    ];

    this.prompt(prompts, function (props) {
        this.presentationTitle = props.presentationTitle;

        cb();
    }.bind(this));
};

PresentationGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('config.js', 'config.js');
    this.copy('index.html.mustache', 'web/index.html.mustache');
    this.copy('main.less', 'styles/index.less');
    this.copy('main.js', 'scripts/index.js');
    this.copy('steps.json', 'steps/_steps.json');
    this.template('start.md', 'steps/start.md');

    // ImpressConsole
    this.copy('impressConsole.js', 'scripts/impressConsole.js');
    this.copy('impressConsole.less', 'styles/console.less');
    this.copy('impressConsole.license.txt', 'impressConsole.license.txt');

    // Build Related
    this.copy('build/tasks/browserSync.js', 'build/tasks/browserSync.js');
    this.copy('build/tasks/build.js', 'build/tasks/build.js');
    this.copy('build/tasks/markup.js', 'build/tasks/markup.js');
    this.copy('build/tasks/scripts.js', 'build/tasks/scripts.js');
    this.copy('build/tasks/styles.js', 'build/tasks/styles.js');
    this.copy('build/util/bundleLogger.js', 'build/util/bundleLogger.js');
    this.copy('build/util/handleErrors.js', 'build/util/handleErrors.js');

};

PresentationGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

PresentationGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};
