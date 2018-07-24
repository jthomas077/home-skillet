
import path from 'path';
import DirectoryNamedWebpackPlugin from 'directory-named-webpack-plugin';
import entry from './webpack.config.entry';
import alias from './webpack.config.alias';
import plugins from './webpack.config.plugins';

module.exports =
{
    entry: entry,

    output:
    {
        path: path.resolve(`${process.env.DEST}/js`),
        publicPath: '/js/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },

    resolve:
    {
        extensions: ['.ts', '.js', '.json', '.html'],

        alias: alias,

        modules: ['node_modules'],

        plugins:
        [
            new DirectoryNamedWebpackPlugin()
        ]
    },

    optimization:
    {
        splitChunks:
        {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '.',
            name: true,

            cacheGroups:
            {
                vendors:
                {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },

                default:
                {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    module:
    {
        rules:
        [
            {
                test: /\.ts?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    plugins: plugins,

    mode: (__DEV__) ? 'development' : process.env.NODE_ENV,

    devServer:
    {
        contentBase: process.env.DEST,
        watch: false
    },

    devtool: 'source-map'
};
