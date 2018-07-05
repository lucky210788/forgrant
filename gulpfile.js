var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

var config = {
    'src': './src',
    'dest': './dist',
    'html': {
        'src': './src/*.html',
        'dest': './dist'
    },
    'sass':{
        'dest': './dist/style/css',
        'src': './src/style/sass/style.scss'
    },
    'jslib': {
        'src': [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        'dest': './dist/js/lib'
    },
    'js': {
        'src': './src/js/*.js',
        'dest': './dist/js'
    },
    'img':{
        'src': './src/images/*/*',
        'dest': './dist/images'
    },
    'fonts':{
        'src': './src/style/fonts/*/*',
        'dest': './dist/style/fonts'
    }
};

gulp.task('copy:html', function () {
    return gulp.src([config.html.src])
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('img', function () {
    return gulp.src([config.img.src])
        .pipe(gulp.dest(config.img.dest));
});

gulp.task('fonts', function () {
    return gulp.src([config.fonts.src])
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: '>5%'
        }))
        .pipe(cssnano())
        // .pipe(rename(function (path) {
        //     path.basename += '.min';
        // }))
        .pipe(gulp.dest(config.sass.dest));
});

gulp.task('js:lib', function () {
    return gulp.src(config.jslib.src)
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(config.jslib.dest));
});

gulp.task('clean', function () {
    return gulp.src(config.dest, {read: false})
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('build', ['copy:html', 'img', 'fonts', 'sass', 'js:lib', 'js'], function () {});