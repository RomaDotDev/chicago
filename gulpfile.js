var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

var appRoot = './';

var sassPaths = ['**/*.scss', '!node_modules/**/*.*', '!app/scss/**.*']

gulp.task('default', ['styles']);

gulp.task('watch', function() {
    gulp.watch(sassPaths, ['styles']); // watch styles changes
});

// build styles, add prefixes and minify
gulp.task('styles', function() {
    return gulp.src(sassPaths, {base: './'})
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('> 5%'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./'));
});
