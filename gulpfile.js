const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const watch = require("gulp-watch");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");

const configuration = require("./gulpconfig.json");
const paths = configuration.paths;

//^^ GULP SASSMIN
//^ compiles scss into minified css + map file for production
gulp.task("sassmin", () => {
  return gulp
    .src([`${paths.sass}/*.scss`])
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gcmq())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err.message);
          this.emit("end");
        }
      })
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano({ discardComments: { removeAll: true } }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.css));
});

//^^ GULP SASS
//^ compiles scss files to normal css for development
gulp.task("sass", () => {
  return gulp
    .src([`${paths.sass}/*.scss`])
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gcmq())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err.message);
          this.emit("end");
        }
      })
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest(paths.css));
});

//^^ GULP WATCH
//^ watches changes to scss files and compile both minified and normal version
gulp.task("watch", () => {
  gulp.watch(`${paths.sass}/**/*.scss`, gulp.series("sass"));
  gulp.watch(`${paths.sass}/**/*.scss`, gulp.series("sassmin"));
});
