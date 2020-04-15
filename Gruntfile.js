module.exports = function (grunt) {
	const sass = require('dart-sass');

	grunt.initConfig({
		nunjucks: {
			options: {
				data: grunt.file.readJSON('data.json'),
				paths: ['src/templates', 'src/templates/layouts']
			},
			render: {
				files: [{
					expand: true,
					cwd: 'src/templates/pages',
					src: [
						'**/*.njk',
						'!**/_*.njk'
					],
					dest: './',
					ext: '.html'
				}]
			}
		},
		sass: {
			dist: {
				options: {
					implementation: sass,
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'css/style.css': 'src/scss/style.scss'
				}
			}
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer')(),
					require('postcss-combine-duplicated-selectors')(),
					require('cssnano')(),
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},
		prettify: {
			options: {
				indent: 4
			},
			all: {
				expand: true,
				cwd: './',
				ext: '.html',
				src: ['*.html'],
				dest: './'
			}
		},
		watch: {
			dev: {
				files: [
					'src/scss/**/*.scss',
					'src/templates/**/*.html',
					'src/templates/**/*.njk',
					'data.json'
				],
				tasks: ['sass', 'postcss', 'nunjucks', 'prettify']
			},
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'./**/*.html',
						'./css/**/*.css'
					]
				},
				options: {
					watchTask: true,
					// proxy: 'bonvoyage.loc'
					server: {
						baseDir: "./",
						directory: true
					}
				},
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-nunjucks-2-html');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('css', ['sass', 'postcss']);
	grunt.registerTask('html', ['nunjucks', 'prettify']);
	grunt.registerTask('build', ['css', 'html']);
	grunt.registerTask('default', ['browserSync', 'watch']);
}
