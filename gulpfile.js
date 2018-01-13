/*
*   Gulpfile for Codebase
*   Uses browserSync for watching and live reloading on different browser
*
*   Additional Utils:
*
*/

var browserSync = require('browser-sync');
    gulp        = require('gulp'),
    gutil       = require('gulp-util');

/*
*  Define the default
*  Uncomment if it is the only default gulp task on the workspace
*/
gulp.task('default', ['codebase-serve'])

gulp.task('codebase-serve', function(){
     browserSync({
        files: ["app/css/*.css", "app/js/*.js", "app/*.html", "app/*.php", "app/bs/*.html", "app/bs/*.php" ],
        server: {
            baseDir: "app"
        }
    });
});
