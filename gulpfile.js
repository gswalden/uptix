var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var minifyCSS   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('less', function () {
    return gulp.src('css/src/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/dist'))
        .pipe(browserSync.stream())
        .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('js', function () {
    return gulp.src('js/src/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('uptix.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('js/dist'))
        .pipe(browserSync.stream())
        .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('jade', function () {
    return gulp.src('jade/index.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream())
        .pipe(notify('Finished file: <%= file.relative %>'));
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browser-sync'], function () {
    gulp.watch('css/src/*.less', ['less']);
    gulp.watch('jade/*.jade', ['jade']);
    gulp.watch('js/src/*.js', ['js']);
});
