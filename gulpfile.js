const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


const locals = {
    src: {
        html: './src/**/*.html',
        scss: './src/scss/**/*.scss',
        js: './src/jssrc/**/*.js'
    },
    output: {
        css: './public/css',
        path: './public',
        js:'./public/js'
    }
}

gulp.task('htmltrans', function () {
    return gulp.src(locals.src.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(locals.output.path))
});

gulp.task('jsprocess', function () {
    return gulp.src(locals.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['env']
        }))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(locals.output.js))
});

gulp.task('build',['htmltrans', 'jsprocess'], function () {
    return gulp.src(locals.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('bundle.min.css'))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS(({
            compatibility: 'ie9',
            level:2
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(locals.output.css))
        .pipe(browserSync.reload({
            stream: true
        }));

});

gulp.task('watch',['browser-sync'], function() {
    gulp.watch(locals.src.scss, ['build']);
    gulp.watch(locals.src.html, browserSync.reload)}
);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: locals.output.path
        }
    });
});

gulp.task('default', ['build', 'watch']);