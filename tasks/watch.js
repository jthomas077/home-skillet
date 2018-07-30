
import { series, watch } from 'gulp';

export const stalk_me = series(GULP_TASK('browsersync'), () =>
{
    watch([`${process.env.SRC}/**/*.scss`], series(GULP_TASK('sass')));
    watch([`${process.env.SRC}/**/*.html`], series(GULP_TASK('include')));
    watch([`${process.env.SRC}/**/*`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**/*`], series(GULP_TASK('copy')));
    watch([`${process.env.SRC}/media/images/**/*`], series(GULP_TASK('image')));

    if (!__HMR__)
    {
        watch([`${process.env.SRC}/**/*.ts`], series(GULP_TASK('js')));
    }

    return new Promise((resolve) => { resolve(); });
});
