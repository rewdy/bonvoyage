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
2. From the cloned repo, run `npm install` (or `yarn install`)
3. Remove the whole .git folder and probably this README file so your new project won't have references to this starter setup.
4. Update package.json and Gruntfile.js with your project's info (if you want).
5. You're all ready! You can checkout the GruntFile to see the grunt commands setup or here's a short list:
    * `grunt` (the default command) will fire up browser sync and start the watch task. With this running, your edits should show up live in the browser.
    * `grunt watch` run the watch task to trigger CSS and template compiling as changes are made to the files.
    * `grunt html` will compile the HTML from the Nunjucks files.
    * `grunt css` will compile the CSS from the SASS files.
    * `grunt build` will compile the css and the html.

## Nunjucks setup

The template setup is as follows:
 * One layout has been created in `src/templates/layouts`. Editing this will change the wrapper/layout for pages.
 * A basic index page has been created in `src/templates/pages`. You can create additional pages by using that file as a starter (or review the [Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html) to learn more fully how things work).
 * Data from the `data.json` file is available in all nunjucks template files. Any additional valid json can be added to that file to include more data in the templates.
 
 Templates get compiled when the `npm html` (which is just a passthrough to `grunt html`) command gets run or as part of the watch task. 

 To develop with live reloading, use the `npm serve` or `grunt` (default command). This will start up browsersync and the watcher so changes will be live reloaded.

## Power user tip

You can add this bit to your `.bash_profile` file to make a `bonvoyage` command to use in Terminal.

```
bonvoyage() {
	git clone https://github.com/rewdy/bonvoyage.git $1
	if [ -z ${1+x} ]
	then
		cd bonvoyage
	else
		cd $1
	fi
    echo -e '\nInstalling node modules...\n-------'
    npm install
	rm -rf .git
    echo -e '\n✅ Removed git reference.'
	rm readme.md
    echo -e '✅ Removed readme file.'
    echo -e '\nDone.\n\n🎗 Reminder: Before running browsersync, be sure to update the proxy setting in Gruntfile.js.'
}
``` 

After you have added the above function, you can use the following syntax to start: `bonvoyage project_folder`

Doing so will clone the bonvoyage project into your project directory, cd into your newly created project, and run the setup scripts.

After adding the above, don't forget to run `source ~/.bash_profile` or create a new terminal session for the function to be found.

## Questions/comments

[Tweet me...](http://twitter.com/rewdy)