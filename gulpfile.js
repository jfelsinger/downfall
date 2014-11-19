'use strict';
// var LIVERELOAD_PORT = 4500;

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    htmlmin = require('gulp-htmlmin'),
    rimraf = require('gulp-rimraf'),
    notify = require('gulp-notify'),
    getAtom = require('gulp-download-atom-shell'),
    mocha = require('gulp-mocha');


// Configuration Directories
var dir = {
    app: 'downfall-app',
    assets: 'assets',
    dist: 'dist'
};

gulp.task('rimraf', function() {
    return gulp.src(dir.dist, {read: false})
        .pipe(rimraf());
});

gulp.task('bower', function() {
    return bower();
        // .pipe(gulp.dest(dir.assets + '/scripts/vendor'));
});

gulp.task('bower-styles', function() {
    return bower({
        cwd: dir.assets + '/styles'
    });
});

gulp.task('styles', ['bower-styles'], function() {
    return gulp.src(dir.assets + '/styles/*.{scss,sass}')
        .pipe(compass({
            style: 'expanded',
            css: dir.dist + '/styles',
            sass: dir.assets + '/styles',
            require: [
            ]
        }))
        .pipe(autoprefixer())

        // .pipe(minifycss())

        .pipe(gulp.dest(dir.dist + '/styles'))

        .pipe(notify({message: 'Styles task complete' }));
});

gulp.task('clientScripts', function() {
    return gulp.src([
            dir.assets + '/scripts/**/*.js',
            '!' + dir.assets + '/scripts/models/**',
            '!' + dir.assets + '/scripts/view-models/**',
            '!' + dir.assets + '/scripts/lib/**',
            '!' + dir.assets + '/scripts/vendor/**',
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(browserify())

        // .pipe(uglify())

        .pipe(gulp.dest(dir.dist + '/scripts'))

        .pipe(notify({ message: 'Client scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src(dir.assets + '/images/**/*.{webp,png,jpg,jpeg}')
        .pipe(
            imagemin({ 
                optimizationLevel: 3, 
                progressive: true, 
                interlaced: true 
            }))
        .pipe(gulp.dest(dir.dist + '/images/'))

        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('svg', function() {
    return gulp.src(dir.assets + '/images/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(dir.dist + '/images/'))

        .pipe(notify({ message: 'SVG task complete' }));
});

gulp.task('html', function() {
    return gulp.src([
            dir.assets + '/html/**/*.{html,htm}'
        ])
        .pipe(
            htmlmin({
                removeCommentsFromCDATA: true,
                collapseBooleanAttributes: true,
                removeRedundentAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            })
        )
        .pipe(gulp.dest(dir.dist + '/html'))

        .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('get-atom', function(cb) {
    getAtom({
        version: '0.19.2',
        outputDir: 'bin',
    }, cb);
});

gulp.task('watch', ['build'], function() {

    // Watch styles
    gulp.watch(dir.assets + '/styles/{**/*.{sass,scss}', ['styles']);

    // Watch assets scripts
    gulp.watch(dir.assets + '/scripts/**/*.js', ['clientScripts']);

    // Watch image files
    gulp.watch(dir.assets + '/images/**/*.{png,jpg,jpeg}', ['images']);

    // Watch svg files
    gulp.watch(dir.assets + '/images/**/*.svg', ['svg']);

    // Watch html files
    gulp.watch(dir.assets + '/html/**/*.{html,htm}', ['html']);

});

gulp.task('mocha', function() {
    gulp.src('./test/**/*.js')
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('lint', function() {
    return gulp.src([
            dir.assets + '/scripts/**/*.js',
            '!' + dir.assets + '/scripts/vendor/**',
            'gulpfile.js',
            'test/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'Linting task complete' }));
});

gulp.task('build', ['get-atom', 'rimraf', 'bower'], function() {
    gulp.start('html', 'styles', 'clientScripts', 'images', 'svg');
});

gulp.task('test', ['build', 'lint', 'mocha']);

/** Build it all up and serve it */
gulp.task('default', ['watch']);

// /** Build it all up and serve the production version */
// gulp.task('serve', ['app', 'client', 'watch']);
