
import { src, dest } from 'gulp';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';

export const got_wat_ya_need = () =>
{
    return src(
    [
        `${process.env.SRC}/**/*`,
        `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**`,
        `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**/*`,
        `!${process.env.SRC}/index.html`
    ])
    .pipe(replace('%%assetPrefix%%', (__DEV__ || __QA__) ? '' : process.env.ASSET_PREFIX))
    .pipe(dest(process.env.DEST))
    .pipe(browserSync.stream());
};
