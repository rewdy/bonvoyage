# Bon Voyage

*Bon Voyage* is a little code setup to start off new projects more quickly.

It includes:
 * [Nunjucks](https://mozilla.github.io/nunjucks/) for templating
 * [SASS](https://sass-lang.com/) for CSS
 * [PostCSS](https://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer) and [CSSNano](https://cssnano.co/) to add appropriate CSS prefixes and compress the CSS
 * [Grunt](https://gruntjs.com/) to run the tasks
 * [BrowserSync](https://www.browsersync.io/) to make development easier

## Instructions

1. Clone the repo. Try `git clone https://github.com/rewdy/bonvoyage.git yourFolderNameHere`.
2. Run the prepare.sh file from the command line. Try `./prepare.sh` from the folder. This will...
    * Run `npm install` to pull in the node modules that are used for the setup
    * Remove the .git folder to unlink the files from this repo
    * Remove the prepare.sh file and this readme file so that you'll have a clean setup
3. Update package.json and Gruntfile.js with your project's info (if you want).
4. You're all ready! You can checkout the GruntFile to see the grunt commands setup or here's a short list:
    * `grunt` (the default command) will fire up browser sync and start the watch task. With this running, your edits should show up live in the browser.
    * `grunt watch` run the watch task to trigger CSS and template compiling as changes are made to the files.
    * `grunt html` will compile the HTML from the Nunjucks files.
    * `grunt css` will compile the CSS from the SASS files.
    * `grunt build` will compile the css and the html.

## Power user tip

You can add this bit to your `.bash_profile` file to make a `bonvoyage` command to use in Terminal.

```
bonvoyage() {
	git clone https://github.com/rewdy/bonvoyage.git $1
	if [ -z ${1+x} ]
	then
		cd bonvoyage
		./prepare.sh
	else
		cd $1
		./prepare.sh
	fi
}
``` 

After you have added the above function, you can use the following syntax to start: `bonvoyage project_folder`

Doing so will clone the bonvoyage project into your project directory, cd into your newly created project, and run the setup scripts.

After adding the above, don't forget to run `source ~/.bash_profile` or create a new terminal session for the function to be found.

## Questions/comments

[Tweet me...](http://twitter.com/rewdy)