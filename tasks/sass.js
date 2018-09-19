
import { src, dest, series } from 'gulp';
import plumber from 'gulp-plumber';
import sassy from 'gulp-sass';
import sassyGlobber from 'gulp-sass-glob';
import sassyVars from 'gulp-sass-variables';
import sourcemap from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

export const make_it_sassy = () =>
{
    return src(`${process.env.SRC}/sass/base.scss`)
            .pipe(plumber())
            .pipe(sassyVars(
            {
                $BUILD: (!__DEV__ && !__QA__),
                $assetPrefix: (__DEV__ || __QA__) ? '' : process.env.ASSET_PREFIX
            }))
            .pipe(sassyGlobber())
            .pipe(sourcemap.init())
            .pipe(sassy(
                {
                    includePaths:
                    [
                        './node_modules/normalize-scss/sass/',
                        './node_modules/sass-mq/',
                        './node_modules/swiper/dist/css/'
                    ],

                    outputStyle: (__DEV__) ? '' : 'compressed'
                })
                .on('error', sassy.logError))
            .pipe(sourcemap.write('/maps'))
            .pipe(plumber.stop())
            .pipe(dest(`${process.env.DEST}/css`))
            .pipe(browserSync.stream());
};
