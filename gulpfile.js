
const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Javascript
const terser = require('gulp-terser-js');

//Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(callback) {
    src('src/scss/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe( sourcemaps.write('.'))
    .pipe( dest('build/css'))
    callback();
}

function images(callback) {
    const options = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(options) ) )
    .pipe( dest('build/img'))
    callback();
}

function webpVersion(callback) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( webp(options) )
    .pipe( dest('build/img'))
    callback();
}

function avifVersion(callback) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( avif(options) )
    .pipe( dest('build/img'))
    callback();
}

function javascript(callback) {
    src('src/js/**/*.js')
    .pipe( sourcemaps.init() )
    .pipe(  terser()  )
    .pipe( sourcemaps.write('.'))
    .pipe( dest('build/js'))
    callback();
}

function dev(callback) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    callback();
}

exports.css = css;
exports.js = javascript;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel( images, webpVersion, avifVersion, javascript, dev);