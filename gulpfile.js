const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    return gulp.src('htdocs')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8030,
            livereload: {
                enable: true
            }
        }));
});

gulp.task('default', gulp.series( gulp.parallel('webserver')));