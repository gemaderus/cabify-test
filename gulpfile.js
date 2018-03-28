var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');
var cachebust = require('gulp-cache-bust');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var src = {
    scss: 'src/scss/*.scss',
    css: 'app/css',
    html: 'src/*.html',
    index: 'app/*.html'
};

var errorMsg = '\x1b[41mError\x1b[0m';
var filesGenerated = 'Your distribution files are generated in: \x1b[1m' + __dirname + '/app/' + '\x1b[0m - ✅';

var onError = function (err) {
    gutil.beep();
    console.log(errorMsg + ' ' + err.toString());
    this.emit('end');
};

gulp.task('html-includes', function () {
    return gulp.src(['src/*.html'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(fileinclude({
            filters: {
                prefix: '@@',
                basepath: '@file'
            }
        }))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('app'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['html-includes', 'sass'], function() {
    browserSync.init({
        server: './app'
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html, ['html-includes']);
    gulp.watch(src.index).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp
        .src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);
