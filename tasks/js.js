
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import webpackConfig from '../webpack/config';
import browserSync from 'browser-sync';

export const secret_sauce = () =>
{
    return src(`${process.env.SRC}/js/base.ts`)
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(plumber.stop())
        .pipe(dest(`${process.env.DEST}/js`))
        .pipe(browserSync.stream());
};
