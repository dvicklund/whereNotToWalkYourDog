// var gulp = require('gulp');
// var webpack = require('webpack-stream');
// var sass = require('gulp-sass');
// var minifyCss = require('gulp-cssnano');
// var sourcemaps = require('gulp-sourcemaps');
// var autoprefixer = require('gulp-autoprefixer');

// var paths = {
//   css: ['app/**/*.scss'],
//   html: ['app/**/*.html'],
//   app: ['app/**/*.js', 'vendor/*.js'],
//   test: ['test/testRoutes.js']
// };

// gulp.task('build:css', function() {
//   gulp.src('app/scss/app.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(gulp.dest('app/css/'))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/'));
// });

// gulp.task('build:html', function() {
//   gulp.src('app/**/*.html')
//   .pipe(gulp.dest('build/'));
// });

// gulp.task('build:js', function() {
//   gulp.src('vendor/*.js')
//   .pipe(gulp.dest('build/'))
  
//   return gulp.src('app/js/entry.js')
//   .pipe(webpack({
//     output: {
//       filename: 'bundle.js'
//     }
//   }))
//   .pipe(gulp.dest('build/'));
// });

// gulp.task('watch:css', function() {
// 	gulp.watch(paths.css, ['build:css']);
// });

// gulp.task('watch:html', function() {
// 	gulp.watch(paths.html, ['build:html']);
// });

// gulp.task('watch:js', function() {
// 	gulp.watch(paths.app, ['build:js']);
// });

// gulp.task('build:all', ['build:css', 'build:html', 'build:js']);
// gulp.task('test:all', ['test:mocha']);
// gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
// gulp.task('default', ['build:all']);


const { src, dest, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concatCss = require('gulp-concat-css')
const minifyCss = require('gulp-minify-css')
const webpack = require('webpack-stream')
// const sourcemaps = require('gulp-sourcemaps')

const paths = {
    css: ['app/**/*.scss'],
    html: ['app/**/*.html'],
    js: ['app/**/*.js'],
    jsEntry: ['app/js/entry.js'],
    test: ['test/testRoutes.js'],
}

function css() {
    return src(paths.css, {sourcemaps: true})
        .pipe(sass())
        .pipe(dest('app/css/'))
        .pipe(concatCss('style.min.css'))
        .pipe(minifyCss())
        .pipe(dest('build/'), {sourcemaps: true})
}

function html() {
    return src(paths.html)
        .pipe(dest('build/'))
}

function js() {
    return src(paths.jsEntry)
        .pipe(webpack({output: {filename: 'bundle.js'}}))
        .pipe(dest('build/'))
        
}

exports.default = parallel(css, html, js);