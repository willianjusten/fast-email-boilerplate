var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    jade        = require('gulp-jade'),
    stylus      = require('gulp-stylus'),
    imagemin    = require('gulp-imagemin'),
    prefixer    = require('autoprefixer-stylus'),
    browserSync = require('browser-sync'),
    premailer   = require('gulp-premailer');

// Jade Task => send to step
gulp.task('jade', function(){
    return gulp.src('src/templates/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('src/step/'))
});

// Stylus Task => send to step
gulp.task('stylus', function(){
        gulp.src('src/styl/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            use:[prefixer()],
            compress: true
        }))
        .pipe(gulp.dest('src/step/'))
});

// Imagemin Task => send to build
gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/img'));
});

// Premailer Task => read from step and send to build
gulp.task('premailer', function () {
    gulp.src('src/step/*.html')
        .pipe(premailer())
        .pipe(gulp.dest('build/'));
});

// Watch Task
gulp.task('watch', function(){
    gulp.watch('src/templates/**/*.jade', ['jade', 'premailer']);
    gulp.watch('src/styl/**/*.styl', ['stylus','premailer']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
});

gulp.task('browser-sync', function () {
   var files = [
      'build/**/*.html',
      'build/img/**/*',
   ];

   browserSync.init(files, {
      server: {
         baseDir: './build/'
      }
   });
});

gulp.task('default', ['jade', 'stylus','imagemin', 'premailer', 'watch', 'browser-sync']);