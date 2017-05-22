var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    lessImport = require('gulp-less-import'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

var path = {
    src: {
        pages: 'html/dist/pug/*.pug',
        styles: 'html/dist/style/**/**/*.less',
        scripts: 'html/dist/js/**/**/*.js'
    },
    dist: {
        pages: 'html/src',
        styles: 'html/src/css',
        scripts: 'html/src/js'
    },
    watch: {
        pages: 'html/dist/pug/**/**/*.pug',
        styles: 'html/dist/style/**/**/*.less',
        scripts: 'html/dist/js/**/**/*.js'
    }
};

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'html/src'
        },
        notify: false
    });
});

gulp.task('pages:build', function () {
    gulp.src(path.src.pages)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.dist.pages))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles:build', function () {
    gulp.src([
        'html/dist/style/helpers/*.less',
        'html/dist/style/blocks/**/*.less'
    ])
        .pipe(lessImport('html/dist/style/style.less'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(path.dist.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts:build', function () {
   gulp.src([
       'html/dist/libs/jquery/jquery.min.js'
   ])
       .pipe(concat('libs.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest(path.dist.scripts));

    gulp.src(path.src.scripts)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('build', function () {
    gulp.start('pages:build');
    gulp.start('styles:build');
    gulp.start('scripts:build');
})

gulp.task('watch', function () {
    watch([path.watch.pages], function(event, cb) {
        gulp.start('pages:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
});

gulp.task('default', ['build', 'browser-sync', 'watch']);