'use strict';

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
    rimraf = require('gulp-rimraf'),
    getAtom = require('gulp-download-atom-shell'),
    mocha = require('gulp-mocha');


// Configuration Directories
var dir = {
    app:    'downfall-app',
    client: 'downfall-app/client',
    dist:   'downfall-app/dist',
};

/**
 * Handle errors in the pipe more gracefully
 */
function handleError(err) {
    /* jshint validthis:true */
    console.log(err.toString());
    this.emit('end');
}

gulp.task('rimraf', function() {
    return gulp.src(dir.dist, {read: false})
        .pipe(rimraf());
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(dir.client + '/js/vendor'));
});

gulp.task('bower-styles', function() {
    return bower({
        cwd: dir.client + '/styles'
    });
});

gulp.task('styles-sass', ['bower-styles'], function() {
    return gulp.src(dir.client + '/js/*.{scss,sass}')
        .pipe(compass({
            style: 'expanded',
            css: dir.client + '/css',
            sass: dir.client + '/styles',
            require: [ ]
        }))
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(gulp.dest(dir.client + '/css'));
});

gulp.task('styles', ['styles-sass'], function() {
    return gulp.src(dir.client + '/css/**')
        .pipe(minifycss())
        .pipe(gulp.dest(dir.dist + '/css'));
});

gulp.task('scripts-browserify', function() {
    return gulp.src([
            dir.client + '/scripts/**/*.js',
            '!' + dir.client + '/scripts/models/**',
            '!' + dir.client + '/scripts/view-models/**',
            '!' + dir.client + '/scripts/lib/**',
            '!' + dir.client + '/scripts/vendor/**',
            '!' + dir.client + '/scripts/templates/**',
            '!' + dir.client + '/scripts/modules/**',
        ])
        .pipe(browserify())
        .on('error', handleError)
        .pipe(gulp.dest(dir.client + '/js'));
});

gulp.task('scripts-client', ['scripts-browserify'], function() {
    return gulp.src(dir.client + '/js/**/*.js')
        .pipe(gulp.dest(dir.dist + '/js'));
});

gulp.task('images', function() {
    return gulp.src(dir.client + '/images/**/*.{webp,png,jpg,jpeg}')
        .pipe(
            imagemin({ 
                optimizationLevel: 3, 
                progressive: true, 
                interlaced: true 
            }))
        .pipe(gulp.dest(dir.dist + '/images/'));
});

gulp.task('svg', function() {
    return gulp.src(dir.client + '/images/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(dir.dist + '/images/'));
});

gulp.task('fonts', function() {
    return gulp.src(dir.client + '/fonts/**')
        .pipe(gulp.dest(dir.dist + '/fonts/'));
});

gulp.task('get-atom', function(cb) {
    getAtom({
        version: '0.19.2',
        outputDir: 'bin',
    }, cb);
});

gulp.task('watch', ['build'], function() {

    // Watch assets scripts
    gulp.watch(dir.client + '/scripts/**/*.js', ['scripts-client']);

    // Watch image files
    gulp.watch(dir.client + '/images/**/*.{png,jpg,jpeg}', ['images']);

    // Watch svg files
    gulp.watch(dir.client + '/images/**/*.svg', ['svg']);

    // Watch font files
    gulp.watch(dir.client + '/fonts/**', ['fonts']);

    // Watch styles
    gulp.watch(dir.client + '/styles/**/*.{sass,scss}', ['styles']);

});

gulp.task('mocha', function() {
    gulp.src('./test/**/*.js')
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('lint', function() {
    return gulp.src([
            'gulpfile.js',
            'test/**/*.js',
            dir.app + '/gulpfile.js',
            dir.app + '/app/**/*.js',
            dir.app + '/config/**/*.js',
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('lint-client', function() {
    return gulp.src([
            dir.client + '/scripts/**/*.js',
            '!' + dir.client + '/scripts/vendor/**',
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('build', ['get-atom', 'rimraf', 'bower'], function() {
    gulp.start('styles', 'scripts-client', 'images', 'svg', 'fonts');
});

gulp.task('test', ['build', 'lint', 'mocha']);

/** Build it all up and serve it */
gulp.task('default', ['watch']);

// /** Build it all up and serve the production version */
// gulp.task('serve', ['app', 'client', 'watch']);
