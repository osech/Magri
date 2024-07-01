const {src, dest, watch, parallel, series} = require('gulp')

const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const prefix = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const avif = require('gulp-avif')
const webp = require('gulp-webp')
const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')
const include = require('gulp-file-include')
const map = require('gulp-sourcemaps')

function pages() {
    return src(['app/pages/*.html'])
        .pipe(include())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function images() {
    return src(['app/images/src/**/*.*', '!app/images/src/**/*.svg'])
        .pipe(newer('app/images'))
        .pipe(avif({ quality : 50 }))

        .pipe(src('app/images/src/**/*.*'))
        .pipe(newer('app/images'))
        .pipe(webp())

        .pipe(src('app/images/src/**/*.*'))
        .pipe(newer('app/images'))
        .pipe(imagemin())

        .pipe(dest('app/images'))
}

function scripts() {
    return src([
        'app/js/main.js'
    ])
        .pipe(map.init())
        .pipe(concat('main.min.js'))
        .pipe(map.write())
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())

}

function styles() {
    return src('app/scss/style.scss')
        .pipe(map.init())
        .pipe(prefix({overrideBrowserslist:['last 2 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(map.write())
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    })
    watch(['app/scss/*.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/pages/*', 'app/components/*'], pages)
    watch(['app/js/main.js'], scripts)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/fonts/*.*',
        'app/images/*.avif',
        'app/images/icons/*.*',
        'app/images/favicon/*.*',
        '!app/images/src',
        'app/js/main.min.js',
        'app/*.html',
        '!app/components',
        '!app/pages',
    ], {base : 'app'})
        .pipe(dest('dist'))
}

exports.styles = styles 
exports.images = images
exports.scripts = scripts
exports.watch = watching
exports.pages = pages

exports.build = series(cleanDist, building)
exports.default = parallel(styles, scripts, pages, watching)


