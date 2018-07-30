
import path from 'path';

export const entry = () =>
{
    let entryPoints =
    {
        base:
        [
            'babel-polyfill',
            path.resolve(`${process.env.SRC}/js/lib/hammer-time.min.js`),
            path.resolve(`${process.env.SRC}/js/base.ts`)
        ],

        legacy:
        [
            'eventsource-polyfill'
        ]
    };

    if (__HMR__)
    {
        entryPoints.base.push('webpack-hot-middleware/client');
    }

    return entryPoints;
};
