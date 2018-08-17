
import { series, watch } from 'gulp';

export const stalk_me = series(GULP_TASK('browsersync'), () =>
{
    watch([`${process.env.SRC}/**/*.scss`], { awaitWriteFinish: true }, series(GULP_TASK('sass')));
    watch([`${process.env.SRC}/**/*.html`], { awaitWriteFinish: true }, series(GULP_TASK('include')));
    watch([`${process.env.SRC}/**/*`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**/*`], { awaitWriteFinish: true }, series(GULP_TASK('copy')));
    watch([`${process.env.SRC}/media/images/**/*`], { awaitWriteFinish: true }, series(GULP_TASK('image')));

    if (!__HMR__)
    {
        watch([`${process.env.SRC}/**/*.ts`], { awaitWriteFinish: true }, series(GULP_TASK('js')));
    }

    return Promise.resolve();
});
