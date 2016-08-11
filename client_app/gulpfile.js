'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function() {
  return gulp.src(['./src/scss/styles.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../public/css'));
});

gulp.task('browser-sync', function() {
  let browserSync = require('browser-sync').create();

  browserSync.init(null, {
    files: ['../public/css/styles.css', '../public/js/app.js'],
    server: {
      baseDir: '../public'
    },
    //proxy: 'localhost:3000', // ...because I use this a lot.
    port: 4000
  });
});

gulp.task('serve', ['browser-sync', 'scss'], function() {
  let browserSync = require('browser-sync').create();
  let reload = browserSync.reload;

  // If the scss file has changed, then re-run the scss command.
  gulp.watch('./src/scss/styles.scss', ['scss'], reload);
});

gulp.task('default', ['scss']);
