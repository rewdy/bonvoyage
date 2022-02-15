module.exports = function (grunt) {
  const sass = require("sass");

  grunt.initConfig({
    nunjucks: {
      options: {
        data: grunt.file.readJSON("src/data.json"),
        paths: ["src/templates", "src/templates/layouts"],
      },
      render: {
        files: [
          {
            expand: true,
            cwd: "src/templates/pages",
            src: ["**/*.njk", "!**/_*.njk"],
            dest: "dist",
            ext: ".html",
          },
        ],
      },
    },
    sass: {
      dist: {
        options: {
          implementation: sass,
          style: "expanded",
          sourcemap: "none",
        },
        files: {
          "dist/css/style.css": "src/scss/style.scss",
        },
      },
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")(),
          require("cssnano")(),
        ],
      },
      dist: {
        src: "dist/css/**/*.css",
      },
    },
    copy: {
      static: {
        files: [
          // copy files from ./src/static to /dist, excluds files starting
					// with an underscore.
          {
            expand: true,
            cwd: "src/static",
            src: ["**", "!**/_*/**", "!**/_*"],
            dest: "dist/",
          },
        ],
      },
    },
    prettify: {
      options: {
        indent: 2,
      },
      all: {
        expand: true,
        cwd: "./dist",
        ext: ".html",
        src: ["*.html"],
        dest: "./dist",
      },
    },
    watch: {
      src: {
        files: [
          "src/scss/**/*.scss",
          "src/templates/**/*.html",
          "src/templates/**/*.njk",
          "src/data.json",
        ],
        tasks: ["sass", "postcss", "nunjucks", "prettify"],
      },
      static: {
        files: ["src/static/**/*"],
        tasks: ["copy:static"],
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["dist/**/*.html", "dist/css/**/*.css"],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./dist/",
          },
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("@lodder/grunt-postcss");
  grunt.loadNpmTasks("grunt-nunjucks-2-html");
  grunt.loadNpmTasks("grunt-prettify");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("css", ["sass", "postcss"]);
  grunt.registerTask("html", ["nunjucks", "prettify"]);
  grunt.registerTask("static", ["copy:static"]);
  grunt.registerTask("build", ["css", "html", "static"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
