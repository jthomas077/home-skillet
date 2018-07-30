
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import color from 'name-that-color';
import inject from 'gulp-inject';
import browserSync from 'browser-sync';

export const color_me_silly = () =>
{
    return src(`${process.env.SRC}/sass/core/_color-palette.scss`, { base: `${process.env.BASE}` })
            .pipe(plumber())
            .pipe(inject(src(`${process.env.SRC}/sass/core/_color-palette.scss`),
            {
                starttag: '// ******* GET COLORS ******* //',
                endtag: '// ******* GOT COLORS ******* //',
                removeTags: true,

                transform: (filepath, file, i, length) =>
                {
                    let colors = [];

                    const raw = file.contents.toString('utf8');
                    // const colorsToTransform = raw.match(/(?<!\$.*?: ?)#.*?(?=;)/gm); // requires node >= 10.x.x
                    const colorsToTransform = raw.replace(/\/\/ ?(#.*?);/gm, (match, hex) =>
                    {
                        const color_me = color.name(hex);
                        const color_name = color_me[1].replace(/ /g, '-').toLowerCase();
                        const color_hex = color_me[0];
                        const color_exact = color_me[2];

                        color_me.pop();

                        if (!color_name.includes('invalid'))
                        {
                            if (__DEV__)
                            {
                                console.log('   Colors Transformed =>', color_me.reverse());
                            }

                            colors.push(`$${color_name}: ${hex};${(!color_exact) ? ` // approx match => ${color_hex}` : ''}`);
                        }
                        else
                        {
                            if (__DEV__)
                            {
                                console.log('   Colors NOT Transformed =>', color_me.reverse());
                            }

                            colors.push(`// ${hex} => Invalid Color`);
                        }
                    });

                    if (colorsToTransform === null || !colors.length)
                    {
                        throw '';
                    }

                    return colors.join('\n');
                }
            }))
            .pipe(plumber.stop())
            .pipe(dest(`${process.env.BASE}`))
            .pipe(browserSync.stream());
};
