'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8000"
    })
});

gulp.task('reload', function() {
    reload();
});

gulp.task('styles', function() {
    return gulp.src('src/stylesheets/**/*.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefix('last 1 version'))
        .pipe(rename('dist.css'))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(reload({ stream: true }))
});

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('src/stylesheets/**/*.scss', ['styles']);
    gulp.watch(['projects/*.html', 'index.html'], ['reload']);
});

gulp.task('default', ['styles', 'browser-sync', 'watch']);