"use strict";

var gulp = require("gulp");
var task = gulp.task;
var parallel = gulp.parallel;
var sass = require("gulp-sass")(require("sass"));
var autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

function buildMainStyles() {
  return gulp
    .src("./styles/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./public/styles/css"));
}

function buildPageStyles() {
  return gulp
    .src("./styles/scss/pages/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./public/styles/css/pages"));
}

task("default", function (cb) {
  parallel(buildMainStyles, buildPageStyles);
  cb();
});

task("watch", function (cb) {
  gulp.watch(
    "./styles/scss/**/*.scss",
    parallel(buildMainStyles, buildPageStyles)
  );
});
