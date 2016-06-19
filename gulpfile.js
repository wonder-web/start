'use strict';

var autoprefixer = require('autoprefixer'),
    gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    precss       = require('precss'),
    cssnext      = require('cssnext'),
    browserSync  = require('browser-sync').create();

/* ==========================================================================
   Variables
   ========================================================================== */

var paths = {
  css: 'src/styles/*.css',
  fonts: 'src/fonts/*',
  js: 'src/scripts/*.js',
  img: 'src/img/*',
  assets: 'src/assets/*'
};




////// my old code
gulp.task('css', function () {
  var processors = [
  	autoprefixer,
  	cssnext,
  	precss
  ];
  
  return gulp.src(path.css)
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/styles'));
});