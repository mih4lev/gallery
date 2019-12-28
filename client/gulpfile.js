const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
const browserSync = require('browser-sync').create();
const del = require('del');
const rename = require('gulp-rename');

// live server (browser-reload)
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        },
        open: false,
        cors: true
    });
    gulp.watch("./source/sass/*.scss", gulp.series('sass'));
    gulp.watch("./source/*.html", gulp.series('html'));
    gulp.watch("./docs/scripts/*.js", gulp.series("scripts"));
    gulp.watch('./source/fonts/*.{woff, woff2, ttf}', gulp.series('fonts'));
    gulp.watch('./source/images/*.{png,jpg,jpeg}', gulp.series('tinypng'));
    gulp.watch('./source/images/*.svg', gulp.series('svg'));
});

// SASS -> CSS
gulp.task('sass', function() {
    return gulp.src("./source/sass/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest("./docs/css"))
        .pipe(browserSync.stream());
});

// SASS -> CSS
gulp.task('scripts', function() {
    return gulp.src("./docs/scripts/bundle.min.js")
        .pipe(browserSync.stream());
});

// HTML
gulp.task('html', function() {
    return gulp.src("./source/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./docs"))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function() {
    del.sync("./docs/fonts");
    return gulp.src("./source/fonts/*")
        .pipe(gulp.dest("./docs/fonts"));
});

// SVG
gulp.task('svg', function() {
    del.sync("./docs/images/*.svg");
    return gulp.src("./source/images/*.svg")
        .pipe(gulp.dest("./docs/images"));
});

// TINYPNG
gulp.task('tinypng', function () {
    del.sync('./docs/images/*.{png,jpg,jpeg}');
    return gulp.src('./source/images/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'wNS29BVwd8BM7rkKHQxBKtnLgZHxbM81',
            log: false
        }))
        .pipe(gulp.dest('./docs/images'))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('sass', 'html', 'fonts', 'scripts', 'svg', 'tinypng', 'browser-sync'));
