
import { src, dest } from 'gulp';
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
            .pipe(dest(process.env.DEST))
            .pipe(browserSync.stream());
};
