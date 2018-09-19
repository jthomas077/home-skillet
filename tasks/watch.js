
import { series, watch } from 'gulp';
import { mri as image } from '../tasks/image';
import { got_wat_ya_need as copy } from '../tasks/copy';
import turbo from 'turbocolor';

export const stalk_me = series(GULP_TASK('browsersync'), () =>
{
    const normalizeFile = (file) =>
    {
        return `./${file.replace(/\\/g, '/')}`;
    };


    let lastFile = {};
    const lastFileAccessTimeTreshold = 250;

    const checkLastFile = (file, stats, msg, cb) =>
    {
        file = normalizeFile(file);

        if ((!Object.keys(lastFile).length) || (file === lastFile.name && stats.size !== lastFile.stats.size) || (file !== lastFile.name && stats.atimeMs > lastFile.stats.atimeMs + lastFileAccessTimeTreshold))
        {
            Object.assign(lastFile,
            {
                name: file,
                stats: stats
            })

            console.log(`${turbo.green(`    ${msg} Changed =>`)}`, file);

            if (typeof cb === 'function')
            {
                cb(file);
            }

            return true;
        }
        else
        {
            console.log(`${turbo.red(`    Bogus ${msg} Changed =>`)}`, file);

            return false;
        }
    };


    watch([`${process.env.SRC}/**/*.scss`, `!${process.env.SRC}/sass/core/_color-palette.scss`],
    {
        awaitWriteFinish: true
    })
    .on('add', (file, stats) =>
    {
        series(GULP_TASK('sass')).call();

        console.log(`${turbo.green(`    SASS File Added =>`)}`, normalizeFile(file));
    })
    .on('change', (file, stats) =>
    {
        checkLastFile(file, stats, 'SASS File', series(GULP_TASK('sass')))
    })
    .on('unlink', (file, stats) =>
    {
        series(GULP_TASK('sass')).call();

        console.log(`${turbo.red(`    SASS File Deleted =>`)}`, normalizeFile(file));
    });


    watch([`${process.env.SRC}/sass/core/_color-palette.scss`],
    {
        awaitWriteFinish: true
    })
    .on('change', (file, stats) =>
    {
        checkLastFile(file, stats, 'Color Palette', series(GULP_TASK('color'), GULP_TASK('sass')))
    });


    watch([`${process.env.SRC}/**/*.html`],
    {
        awaitWriteFinish: true
    })
    .on('add', (file, stats) =>
    {
        series(GULP_TASK('include')).call();

        console.log(`${turbo.green(`    HTML File Added =>`)}`, normalizeFile(file));
    })
    .on('change', (file, stats) =>
    {
        checkLastFile(file, stats, 'HTML File', series(GULP_TASK('include')))
    })
    .on('unlink', (file, stats) =>
    {
        series(GULP_TASK('include')).call();

        console.log(`${turbo.red(`    HTML File Deleted =>`)}`, normalizeFile(file));
    });


    watch([`${process.env.SRC}/**/*`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**`, `!${process.env.SRC}/{js,modules,pages,sass,media/images}/**/*`],
    {
        awaitWriteFinish: true
    })
    .on('add', (file, stats) =>
    {
        series(GULP_TASK('copy')).call();

        console.log(`${turbo.green(`    File Added =>`)}`, normalizeFile(file));
    })
    .on('change', (file, stats) =>
    {
        checkLastFile(file, stats, 'File', copy(file));
    })
    .on('unlink', (file, stats) =>
    {
        console.log(`${turbo.red(`    File Deleted =>`)}`, normalizeFile(file));
    });



    watch([`${process.env.SRC}/media/images/**/*`],
    {
        awaitWriteFinish: true
    })
    .on('add', (file, stats) =>
    {
        image(`./${normalizeFile(file)}`);

        console.log(`${turbo.green(`    Image Added =>`)}`, normalizeFile(file));
    })
    .on('change', (file, stats) =>
    {
        checkLastFile(file, stats, 'Image File', image(file));
    })
    .on('unlink', (file, stats) =>
    {
        console.log(`${turbo.red(`    Image Deleted =>`)}`, normalizeFile(file));
    });



    if (!__HMR__)
    {
        watch([`${process.env.SRC}/**/*.ts`],
        {
            awaitWriteFinish: true
        })
        .on('add', (file, stats) =>
        {
            series(GULP_TASK('js')).call();

            console.log(`${turbo.green(`    TS File Added =>`)}`, normalizeFile(file));
        })
        .on('change', (file, stats) =>
        {
            checkLastFile(file, stats, 'TS File', series(GULP_TASK('js')));
        })
        .on('unlink', (file, stats) =>
        {
            series(GULP_TASK('js')).call();

            console.log(`${turbo.red(`    TS File Deleted =>`)}`, normalizeFile(file));
        });
    }

   return Promise.resolve();
});
