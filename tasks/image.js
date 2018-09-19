
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

export const mri = (img) =>
{
    const srcPath = (typeof img === 'string' && !!img.length)
            ? img
            : `${process.env.SRC}/media/images/**/*`;

    return src(srcPath)
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
            .pipe(dest(`${process.env.DEST}/media/images/`))
            .pipe(browserSync.stream());
};
