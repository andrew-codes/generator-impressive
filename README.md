# generator-impressive [![Build Status](https://secure.travis-ci.org/softwarecraftsman/generator-impressive.png?branch=master)](https://travis-ci.org/softwarecraftsman/generator-presentation)

An impress.js presentation generator for [Yeoman](http://yeoman.io).

## Features
* Content of steps support markdown
* Fenced code blocks support syntax highlighting
* Utilizes [gulp](http://gulpjs.com) to run the presentation


## Getting Started

### Installation

```bash
$ npm install -g generator-impressive
```

### Creating a New Presentation

Create a directory for your new presentation and change into the directory.

```bash
$ mkdir my-new-presentation
$ cd my-new-presentation
```

Now, use the impressive generator to create the presentation

```bash
$ yo impressive
```

and you will be asked for the title of your new presentation. It should generate the following structure:

```bash
bower.json
index.html
scss
bower_components
js
steps
config.json
node_modules
gulpfile.js
package.json
```

### Running Your Presentation

```bash
$ gulp
```

Now open a browser and navigate to http://localhost:9000 to view your presentation.

### Adding Presentation Steps (Content)

Each step is it's own markdown or HTML file in the `/steps` directory and is registered with the presentation in the `/steps/steps.json` file. However, you can easily create new steps and automatically have them registered with the following command; providing it with the new step's title:

```bash
$ yo impressive:step 'My First Content Step'
```

This will add a `/steps/my-first-content-step.md` file that you can then update with your content and automatically
append the step to the presentation in the `/steps/steps.json`.

### Controlling the Transitions

Transitions between steps are controlled via the `/steps/steps.json` file.


### Adding Your Own Style

You can style your presentation using [Sass](http://sass-lang.com). The main Sass file that is included is the
`/scss/main.scss` file. Feel free to add styles there or add new Sass files and import them into the `main.scss`.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Contribute

Feel free to send me a pull request or log an issue.

* Code: https://github.com/softwarecraftsman/generate-impressive
* Issues: https://github.com/softwarecraftsman/generate-impressive/issues

## Credits

I have to give credit to the original [generator-impress](https://github.com/bbaaxx/generator-impress) for my inspiration. This is my first nodejs module and I
used the [generator-impress](https://github.com/bbaaxx/generator-impress) as a starting point.