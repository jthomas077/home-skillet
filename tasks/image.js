
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

export const mri = () =>
{
    return src(`${process.env.SRC}/media/images/**/*`)
            .pipe(plumber())
            .pipe(imagemin(
            [
                imagemin.gifsicle(
                {
                    interlaced: true
                }),
                imagemin.jpegtran(
                {
                    progressive: true
                }),
                imagemin.optipng(
                {
                    optimizationLevel: 5
                }),
                imagemin.svgo(
                {
                    plugins:
                    [
                        { removeViewBox: true },
                        { cleanupIDs: false },
                        { removeUselessStrokeAndFill: true }
                    ]
                })
            ]))
            .pipe(plumber.stop())
            .pipe(dest(`${process.env.DEST}/media/images`))
            .pipe(browserSync.stream());
};
