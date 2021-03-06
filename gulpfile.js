var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minifyCss = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  css: ['app/**/*.scss'],
  html: ['app/**/*.html'],
  app: ['app/**/*.js', 'vendor/*.js'],
  test: ['test/testRoutes.js']
};

gulp.task('build:css', function() {
  gulp.src('app/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/css/'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('build:html', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('build:js', function() {
  gulp.src('vendor/*.js')
  .pipe(gulp.dest('build/'))
  
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('watch:css', function() {
	gulp.watch(paths.css, ['build:css']);
});

gulp.task('watch:html', function() {
	gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:js', function() {
	gulp.watch(paths.app, ['build:js']);
});

gulp.task('build:all', ['build:css', 'build:html', 'build:js']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
gulp.task('default', ['build:all']);
