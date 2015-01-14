var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    jade      = require('gulp-jade'),
    stylus    = require('gulp-stylus'),
    prefixer  = require('autoprefixer-stylus'),
    premailer = require('gulp-premailer');


gulp.task('jade', function(){
    return gulp.src('src/templates/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('src/step/'))
});

gulp.task('stylus', function(){
        gulp.src('src/styl/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            use:[prefixer()],
            compress: true
        }))
        .pipe(gulp.dest('step/'))
});

gulp.task('premailer', function () {
    gulp.src('src/step/*.html')
        .pipe(premailer())
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['jade', 'premailer']);