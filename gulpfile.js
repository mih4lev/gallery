const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const csso = require(`gulp-csso`);
const posthtml = require(`gulp-posthtml`);
const include = require(`posthtml-include`);
const htmlmin = require(`gulp-htmlmin`);
const browserSync = require(`browser-sync`).create();
const del = require(`del`);
const rename = require(`gulp-rename`);
const tinypng = require(`gulp-tinypng-compress`);

// live server (browser-reload)
gulp.task(`browser-sync`, function() {
    browserSync.init({
        server: {
            baseDir: `./public/`
        },
        open: false,
        cors: true
    });
    gulp.watch(`./source/sass/*.scss`, gulp.series(`sass`));
    gulp.watch(`./source/sass/blocks/*.scss`, gulp.series(`sass`));
    gulp.watch(`./source/*.html`, gulp.series(`html`));
    gulp.watch(`./source/components/*.html`, gulp.series(`html`));
    gulp.watch(`./source/components/blocks/main/*.html`, gulp.series(`html`));
    gulp.watch(`./source/components/blocks/inner/*.html`, gulp.series(`html`));
    gulp.watch(`./public/scripts/*.js`, gulp.series(`scripts`));
    gulp.watch(`./source/scripts/blocks/*.js`, gulp.series(`scripts`));
    gulp.watch(`./source/fonts/*.{woff, woff2, ttf}`, gulp.series(`fonts`));
    gulp.watch(`./source/lang/*.json`, gulp.series(`lang`));
    gulp.watch(`./source/images/*.svg`, gulp.series(`svg`));
    gulp.watch(`./source/images/*.{png,jpg,jpeg}`, gulp.series(`tinypng`));
});

// SASS -> CSS
gulp.task(`sass`, function() {
    return gulp.src(`./source/sass/main.scss`)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename(`styles.css`))
        .pipe(gulp.dest(`./public/css`))
        .pipe(browserSync.stream());
});

// SASS -> CSS
gulp.task(`scripts`, function() {
    return gulp.src(`./public/scripts/bundle.min.js`)
        .pipe(browserSync.stream());
});

// HTML
gulp.task(`html`, function() {
    return gulp.src(`./source/*.html`)
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(`./public`))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task(`fonts`, function() {
    del.sync(`./public/fonts`);
    return gulp.src(`./source/fonts/*`)
        .pipe(gulp.dest(`./public/fonts`));
});

// SVG
gulp.task(`svg`, function() {
    del.sync(`./public/images/*.svg`);
    return gulp.src(`./source/images/*.svg`)
        .pipe(gulp.dest(`./public/images`));
});

// LANG
gulp.task(`lang`, function() {
    del.sync(`./public/lang/*.json`);
    return gulp.src(`./source/lang/*.json`)
        .pipe(gulp.dest(`./public/lang`));
});

// TINYPNG
gulp.task(`tinypng`, function () {
    return gulp.src(`./source/images/*.{png,jpg,jpeg}`)
        .pipe(tinypng({
            key: `TQsc1zc45QNBZBD6CC3JrhMTX8hWWW88`,
            sigFile: `./source/images/.tinypng-sigs`,
            summarize: true,
            parallel: true,
            log: true
        }))
        .pipe(gulp.dest(`./public/images`))
        .pipe(browserSync.stream());
});

const tasks = [`sass`, `html`, `fonts`, `scripts`, `svg`, `lang`, `tinypng`, `browser-sync`];
gulp.task(`default`, gulp.parallel(...tasks));
