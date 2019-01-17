module.exports = function() {

    $.gulp.task('clean:generate', function() {
        return $.del([
            './dev/app/img/favicon/*'
        ]);
    });

    $.gulp.task('favicon:generate', function(done) {
        $.realFavicon.generateFavicon({
            masterPicture: 'src/favicon.png',
            dest: 'dev/app/img/favicon',
            iconsPath: '/',
            design: {
                ios: {
                    pictureAspect: 'noChange',
                    assets: {
                        ios6AndPriorIcons: true,
                        ios7AndLaterIcons: true,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true
                    }
                },
                desktopBrowser: {},
                windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#da532c',
                    onConflict: 'override',
                    assets: {
                        windows80Ie10Tile: true,
                        windows10Ie11EdgeTiles: {
                            small: true,
                            medium: true,
                            big: true,
                            rectangle: true
                        }
                    }
                },
                androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#ffffff',
                    manifest: {
                        display: 'standalone',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    },
                    assets: {
                        legacyIcon: true,
                        lowResolutionIcons: true
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'blackAndWhite',
                    threshold: 50,
                    themeColor: '#5bbad5'
                }
            },
            settings: {
                scalingAlgorithm: 'Lanczos',
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false
            },
            markupFile: $.FAVICON_DATA_FILE
        }, function() {
            done();
        });
    });
};