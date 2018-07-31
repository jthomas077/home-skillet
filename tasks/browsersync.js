
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
            index: '/pages/home.html'
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
                const bsUrl = bs.options.get('urls').get('local');

                if (__HMR__)
                {
                    const bundler = webpack(webpackConfig);
                    const devServerConfig = webpackConfig.devServer;

                    Object.assign(devServerConfig,
                    {
                        publicPath: `${bsUrl}/${devServerConfig.contentBase}`
                    });

                    bs.addMiddleware('*', webpackDevMiddleware(bundler, devServerConfig));
                    bs.addMiddleware('*', webpackHotMiddleware(bundler));
                }


                const pages = fs.readdirSync(`${process.env.SRC}/pages/`).map(file => `/${file.replace(/\.html/gi, '')}`);

                /**
                 * Add a proxy for local requests.
                 * Instead of using a `directory` page of pages or links such as `/pages/my-awesome-page.html`,
                 * we can keep links proper such as `/my-awesome-page`
                 */
                bs.addMiddleware('*', proxyMiddleware(pages,
                {
                    target: `${bsUrl}`,
                    logLevel: 'warn',

                    pathRewrite: (path, req) =>
                    {
                        return `/pages/${path}.html`;
                    }
                }));


                /**
                 * Add a proxy for API requests.
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

    return Promise.resolve();
};
