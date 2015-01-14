var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    jade      = require('gulp-jade'),
    stylus    = require('gulp-stylus'),
    imagemin  = require('gulp-imagemin'),
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
        .pipe(gulp.dest('src/step/'))
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('premailer', function () {
    gulp.src('src/step/*.html')
        .pipe(premailer())
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['jade', 'stylus', 'premailer']);