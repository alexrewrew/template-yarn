module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('dev/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('dev/**/*.styl', $.gulp.series('stylus'));
        $.gulp.watch('dev/source/**/*.styl', $.gulp.series('stylus'));
        $.gulp.watch('dev/source/**/*.js', $.gulp.series('scripts'));
        $.gulp.watch('dev/scripts/**/*.js', $.gulp.series('scripts'));
    });
}