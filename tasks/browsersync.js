
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.babel';

export const got_me_goggles = () =>
{
    browserSync.create(process.env.APP_NAME);

    browserSync.init(
    {
        server:
        {
            baseDir: process.env.DEST,
            index: 'index.html'
        },

        port: process.env.PORT || 1337,

        scrollProportionally: false,

        callbacks:
        {
            ready: (err, bs) =>
            {
                const bundler = webpack(webpackConfig);

                bs.addMiddleware('*', webpackDevMiddleware(bundler,
                {
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true }
                }));

                bs.addMiddleware('*', webpackHotMiddleware(bundler));
            }
        }
    });

    return new Promise((resolve) => { resolve(); });
};
