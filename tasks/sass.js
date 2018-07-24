
import { src, dest, series } from 'gulp';
import plumber from 'gulp-plumber';
import sassy from 'gulp-sass';
import sassyGlobber from 'gulp-sass-glob';
import sourcemap from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

export const make_it_sassy = series(GULP_TASK('color'), () =>
{
    return src(`${process.env.SRC}/sass/base.scss`)
            .pipe(plumber())
            .pipe(sassyGlobber())
            .pipe(sourcemap.init())
            .pipe(sassy(
                {
                    includePaths:
                    [
                        './node_modules/normalize-scss/sass/',
                        './node_modules/sass-mq/'
                    ],

                    outputStyle: (__DEV__) ? '' : 'compressed'
                })
                .on('error', sassy.logError))
            .pipe(sourcemap.write('/maps'))
            .pipe(plumber.stop())
            .pipe(dest(`${process.env.DEST}/css`))
            .pipe(browserSync.stream());
});
