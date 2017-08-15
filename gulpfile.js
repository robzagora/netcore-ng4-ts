var gulp = require('gulp');

var libs = './wwwroot/scripts/';

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('restore:jquery', function () {
    gulp.src([
        'node_modules/jquery/**/*.js'
    ]).pipe(gulp.dest(libs + 'jquery'));
});

gulp.task('restore', [
    'restore:jquery'
]);
