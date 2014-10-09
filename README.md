# generator-impressive [![Build Status](https://travis-ci.org/softwarecraftsman/generate-impressive.png?branch=master)](https://travis-ci.org/softwarecraftsman/generate-impressive)

An impress.js presentation generator for [Yeoman](http://yeoman.io).

## Features
* Content of steps support markdown
* Fenced code blocks support syntax highlighting
* Utilizes LESS for styling
* Pushes content/style updates to all local browsers viewing the presentation

## Getting Started Guide

### Installation

```bash
$ npm install generator-impressive
```

### Create a New Presentation

```bash
$ yo impressive
```

### Running Your Presentation

```bash
$ npm start
```

Now open a browser and navigate to http://localhost:3000 to view your presentation.

### Adding Presentation Steps (Content)

Each step is it's own markdown file in the `/steps` directory and is registered with the presentation in the `/steps/_steps.json` file. However, you can easily create new steps and automatically have them registered with the following command; providing it with the new step's title:

```bash
$ yo impressive:step 'My First Content Step'
```

This will add a `/steps/my-first-content-step.md` file that you can then update with your content. The new step is automatically
appended to the presentation in the `/steps/_steps.json`.

### Controlling the Transitions

Transitions between steps are controlled via the `/steps/_steps.json` file.


### Adding Your Own Style

You can style your presentation using LESS. The main LESS file that is included is the
`/styles/index.less` file. Feel free to add styles there or add new LESS files and import them into the `index.less`.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Contribute

Feel free to send me a pull request or log an issue.

* Code: https://github.com/softwarecraftsman/generate-impressive
* Issues: https://github.com/softwarecraftsman/generate-impressive/issues

## Credits

I have to give credit to the original [generator-impress](https://github.com/bbaaxx/generator-impress) for my inspiration. This is my first nodejs module and I
used the [generator-impress](https://github.com/bbaaxx/generator-impress) as a starting point.
