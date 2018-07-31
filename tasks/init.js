
import { series } from 'gulp';

export const make_it_happen = series((done) =>
{
    done();

    /**
     * In the words of Super Mario, letsa go waa! :)
     */
    HMR();
    TOOLING();
    DEV_START();
    BUILD();
},
GULP_TASK('build'), GULP_TASK('watch'), () => DEV_LAUNCH());
