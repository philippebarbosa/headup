/**
 * Plugins
 */
var gulp         = require('gulp');
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify');


/**
 * Paths
 */
var scssSrc = 'src/scss/',
    jsSrc   = 'src/js/',
    dist    = 'dist/'



/**
 * Environnement
 */

env = (function() {
    var env = 'development';
    return env;
} ());

// Set to production (for builds)
gulp.task( 'envProduction', function() {
    env = 'production';
});


/**
 * CSS
 */
gulp.task('css', function () {

        if ( env === 'production' ) {
            output = 'compressed';
        } else {
            output = 'expanded';
        }

        // gulp.src(scssSrc + 'style.scss')
        // .pipe(plumber())
        // .pipe(autoprefixer({
        //     browsers: ['last 3 versions'],
        //     cascade: false
        // }))
        // .pipe(combineMq())
        // .pipe(gulp.dest(dist + 'css'));

    var processors = [
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker
    ];
    return gulp.src('src/scss/style.scss')
        .pipe(sass({ outputStyle : output }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(dist + 'css/'));

});

/**
 * JAVASCRIPT
 */

// gulp.task('jsLibs', function() { // Concatenate all JS libs
//     return gulp.src([
//         './lib/file3.js',
//         './lib/file1.js',
//         './lib/file2.js']
//     )
//     .pipe(concat('plugins.js'))
//     .pipe(gulp.dest('./dist/'));

// });

gulp.task('jsScripts', function() { // Move main js script file
  gulp.src(jsSrc + 'index.js')
    .pipe(plumber())
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('jsScriptsBuild', function() { // Move and minify main js script file
  gulp.src('src/js/index.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'js/'));
});





 /**
 * TASKS
 */

// default task (development)
gulp.task('default', ['css', 'jsScripts'], function () {
    gulp.watch('src/scss/*/*.scss', ['css']);
    gulp.watch('src/js/index.js', ['jsScripts']);
});

// Build tasks
gulp.task( "build", [ 'envProduction', 'css', 'jsScriptsBuild'], function () {
    console.log("Build complete !");
});