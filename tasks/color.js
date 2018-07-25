
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
                starttag: '// ******* GET COLORS ******* //',
                endtag: '// ******* GOT COLORS ******* //',

                transform: (filepath, file, i, length) =>
                {
                    const raw = file.contents.toString('utf8');
                    const colorsToTransform = raw.match(/(?<!\$.*?: ?)#.*?(?=;)/gm);

                    if (colorsToTransform === null)
                    {
                        throw '';
                    }

                    if (__DEV__)
                    {
                        console.log('   Transforming Colors =>', colorsToTransform)
                    }

                    return colorsToTransform.map(hex =>
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

                            return `$${color_name}: ${hex};${(!color_exact) ? ` // approx match => ${color_hex}` : ''}`;
                        }
                        else
                        {
                            if (__DEV__)
                            {
                                console.log('   Colors NOT Transformed =>', color_me.reverse());
                            }

                            return `// ${hex} => Invalid Color`;
                        }
                    })
                    .join('\n');
                }
            }))
            .pipe(plumber.stop())
            .pipe(dest(process.env.BASE))
            .pipe(browserSync.stream());
};
