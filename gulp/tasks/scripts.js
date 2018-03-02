module.exports = function () {
    $.gulp.task('scripts:lib', function () {
        return $.gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery-ui-dist/jquery-ui.js',
            // 'node_modules/jquery-ui/ui/i18n/datepicker-uk.js',
            // 'node_modules/jquery-ui/ui/i18n/datepicker-ru.js',
            // 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            'app/source/fontawesome-free-5.0.6/svg-with-js/js/fontawesome-all.js',
            'node_modules/chosen-js/chosen.jquery.js',
            'node_modules/select2/dist/js/select2.full.js',
            'node_modules/slick-carousel/slick/slick.js',
            // 'node_modules/wowjs/dist/wow.js',
            'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
            'node_modules/nouislider/distribute/nouislider.js',
            'node_modules/wnumb/wNumb.js',
            // 'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
            // 'node_modules/fullpage.js/vendors/jquery.easings.min.js',
            // 'node_modules/fullpage.js/vendors/scrolloverflow.js',
            // 'node_modules/fullpage.js/dist/jquery.fullpage.js',
            // 'node_modules/jquery-slimscroll/jquery.slimscroll.js',
            // 'node_modules/bowser/bowser.js'
        ])
            .pipe($.concat('vendor.js'))
            .pipe($.gulp.dest('app/js'))
            .pipe($.browserSync.reload({
                'stream': true
            }))
    });

    $.gulp.task('scripts', function () {
        return $.gulp.src([
            'app/scripts/dev.js',
            'app/scripts/mail.js'
        ])
            .pipe($.concat('scripts.js'))
            .pipe($.gulp.dest('app/js'))
            .pipe($.browserSync.reload({
                'stream': true
            }))
    });

    $.gulp.task('scripts:build', function () {
        return $.gulp.src('app/js/*.js')
            .pipe($.sourcemaps.init())
            .pipe($.uglify())
            .pipe($.sourcemaps.write())
            .pipe($.gulp.dest('dist/js'))
    });
}