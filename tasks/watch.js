
import { series, watch as watcher } from 'gulp';
import browserSync from 'browser-sync';

export const stalk_me = series(GULP_TASK('browsersync'), () =>
{
    watcher([`${process.env.SRC}/**/*.scss`], series(GULP_TASK('sass')));
    watcher([`${process.env.SRC}/**/*.ts`], series(GULP_TASK('js')));
    watcher([`${process.env.SRC}/**/*.html`], series(GULP_TASK('include')));
    watcher([`${process.env.SRC}/**/*`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**/*`], series(GULP_TASK('copy')));
    watcher([`${process.env.SRC}/media/images/**/*`], series(GULP_TASK('image')));
    watcher([`${process.env.DEST}/**/*`, `!${process.env.DEST}/js`, `!${process.env.DEST}/js/**/*`], browserSync.get(process.env.APP_NAME).reload);

    return new Promise((resolve) => { resolve(); });
});
