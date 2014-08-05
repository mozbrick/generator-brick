'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BrickGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Brick generator!'));

    var prompts = [{
      name: 'brickname',
      message: 'How would you like to call your brick?'
    },{
      name: 'tagname',
      message: 'What will be the html-tag of your brick?'
    },{
      name: 'description',
      message: 'Describe your brick.',
      default: 'A Brick Component',
    },{
      name: 'github',
      message: 'What is your github username?',
    }];

    this.prompt(prompts, function (props) {
      this.brickname = props.brickname;
      this.bricknameLowercase = props.brickname.toLowerCase();
      this.tagname = props.tagname;
      this.classname = props.tagname.split('-')
        .map(function (s) {
          return s[0].toUpperCase() + s.substr(1);
        })
        .join('') + 'Element';
      this.prototypename = this.classname + 'Prototype';
      this.description = props.description;
      this.github = props.github;

      done();
    }.bind(this));
  },

  app: function () {

    this.mkdir('src');
    this.copy('src/themes/default/default.styl','src/themes/default/default.styl');
    this.copy('src/element.html','src/' + this.tagname + '.html');
    this.copy('src/element.js','src/' + this.tagname + '.js');
    this.copy('src/element.styl','src/' + this.tagname + '.styl');

    this.mkdir('test');
    this.copy('test/browser.js','test/browser.js');

    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('karma.conf.js', 'karma.conf.js');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.copy('index.html', 'index.html');

    this.copy('readme.md', 'readme.md');
    this.copy('_LICENSE', 'LICENSE');

  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = BrickGenerator;
