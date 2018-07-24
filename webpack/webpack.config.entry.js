
import path from 'path';

const entry =
{
    base:
    [
        'babel-polyfill',
        path.resolve(`${process.env.SRC}/js/base.ts`)
    ],

    common:
    [
        path.resolve(`${process.env.SRC}/js/lib/hammer-time.min.js`)
    ],

    polyfill:
    [
        'eventsource-polyfill'
    ]
};

if (__DEV__)
{
    entry.base = entry.base.concat(['webpack-hot-middleware/client', 'webpack/hot/dev-server']);

    /*
    Object.assign(entry,
    {
        client: 'webpack-hot-middleware/client',
        devserver: 'webpack/hot/dev-server'
    });
    */
}

module.exports = entry;
