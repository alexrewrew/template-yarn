module.exports = function () {
    $.gulp.task('imagemin:build', function () {
        return $.gulp.src('dev/app/img/**/*')
            .pipe($.imagemin({
                use: [
                    $.imageminWebp({quality: 99})
                ]
            }))
            .pipe($.gulp.dest('build/img'));
    });
};