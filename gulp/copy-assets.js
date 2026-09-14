/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

// gulp 5 reads files as utf8 by default, which corrupts binary assets such as images
gulp.task('copy-assets', function () {
  return gulp.src([
    `${config.paths.assets}/**`,
    `!${config.paths.assets}/sass/**`
  ], { encoding: false })
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src([
    `${config.paths.docsAssets}/**`,
    `!${config.paths.docsAssets}/sass/**`
  ], { encoding: false })
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-component-assets', function () {
  return gulp.src([config.paths.components + '/**/*.js'])
    .pipe(gulp.dest(config.paths.public + 'javascripts/components'))
})
