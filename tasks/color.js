
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import color from 'name-that-color';
import inject from 'gulp-inject';
import browserSync from 'browser-sync';

export const color_me_silly = () =>
{
    return src(`${process.env.SRC}/sass/core/_color-palette.scss`, { base: process.env.BASE })
            .pipe(plumber())
            .pipe(inject(src(`${process.env.SRC}/sass/core/_color-palette.scss`),
            {
                starttag: '// getme:colors',
                endtag: '// gotme:colors',
                removeTags: true,

                transform: (filepath, file, i, length) =>
                {
                    const raw = file.contents.toString('utf8');
                    let colorsToTransform = raw.match(/"\?" ?: ?#.*,?/g);

                    if (colorsToTransform === null)
                    {
                        throw '';
                    }

                    return colorsToTransform.map(c =>
                    {
                        const hex = c.match(/#.+(?=( |,))/g);
                        const colorme = color.name(hex[0]).reverse();

                        if (!colorme.includes('Invalid'))
                        {
                            return `"${colorme[1]}": ${hex}, // ${(!colorme[0]) ? `'approx match -> ' ${colorme[2]}` : ''}`;
                        }
                    })
                    .join('\n    ');
                }
            }))
            .pipe(plumber.stop())
            .pipe(dest(process.env.BASE))
            .pipe(browserSync.stream());
};
