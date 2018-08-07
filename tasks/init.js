
import { series } from 'gulp';

export const make_it_happen = series(GULP_TASK('build'), GULP_TASK('watch'), () => DEV_LAUNCH());
