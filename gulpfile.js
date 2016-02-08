'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourceMaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

 
gulp.task('sass', function () {
  gulp.src('css/*.scss')
  	.pipe(sourceMaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());

});


gulp.task('html', function() {
  gulp.src('*.html')
      .pipe(browserSync.reload());
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('css/**/*.scss', ['sass']);
  gulp.watch('*.html', ['html']);

});

gulp.task('default', ['watch', 'sass']);