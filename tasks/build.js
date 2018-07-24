
import { series, parallel } from 'gulp';

export const aw_yea =
    series(GULP_TASK('clean'), GULP_TASK('js'),
        parallel(GULP_TASK('sass'), GULP_TASK('include'), GULP_TASK('image'), GULP_TASK('copy')),
    GULP_TASK('cleanup'),
(done) =>
{
    done();

    QUACKQUACK(!__DEV__);

    BUILD_COMPLETE();

    return new Promise((resolve) => { resolve(); });
});
