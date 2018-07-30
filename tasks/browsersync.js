
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/config';
import proxyMiddleware from 'http-proxy-middleware';
import fs from 'fs';

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

        notify: false,

        logLevel: 'none',

        logFileChanges: false,

        callbacks:
        {
            ready: (err, bs) =>
            {
                if (__HMR__)
                {
                    const bundler = webpack(webpackConfig);
                    const devServerConfig = webpackConfig.devServer;

                    Object.assign(devServerConfig,
                    {
                        publicPath: `${process.env.APP_URL}:${bs.options.get('port')}/${devServerConfig.contentBase}`
                    });

                    /**
                     *
                     */
                    bs.addMiddleware('*', webpackDevMiddleware(bundler, devServerConfig));
                    bs.addMiddleware('*', webpackHotMiddleware(bundler));
                }

                const pages = fs.readdirSync(`${process.env.SRC}/pages/`).map(file => `/${file.replace(/\.html/gi, '')}`);

                /**
                 *
                 */
                bs.addMiddleware('*', proxyMiddleware(pages,
                {
                    target: `${process.env.APP_URL}:${bs.options.get('port')}`,
                    logLevel: 'warn',

                    pathRewrite: (path, req) =>
                    {
                        return `/pages/${path}.html`;
                    }
                }));


                /**
                 *
                 */
                if (process.env.MOCK_API_URL !== '')
                {
                    bs.addMiddleware('*', proxyMiddleware(process.env.MOCK_API_ROUTE,
                    {
                        target: process.env.MOCK_API_URL
                    }));
                }
            }
        }
    });

    return new Promise((resolve) => { resolve(); });
};
