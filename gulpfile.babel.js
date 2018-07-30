
import gulp from 'gulp';
import fwdRef from 'undertaker-forward-reference';
import dir from 'require-dir';
import './config';

gulp.registry(fwdRef());

const tasks = dir(process.env.TASKS);

Object.entries(tasks).forEach(([taskName, task]) =>
{
    gulp.task(GULP_TASK(taskName), ...Object.values(task));
});

gulp.task('default', gulp.series(GULP_TASK('init')));
