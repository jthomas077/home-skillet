
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';

export const cool_kat = () =>
{
    return src(`${process.env.SRC}/**/*.html`)
            .pipe(plumber())
            .pipe(fileInclude(
            {
                prefix: '##',
                basepath: process.env.SRC,
                context:
                {
                    titlePrefix: process.env.APP_NAME
                }
            }))
            .pipe(plumber.stop())
            .pipe(dest(process.env.DEST))
            .pipe(browserSync.stream());
};
