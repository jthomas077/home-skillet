
import * as config from './';
import path from 'path';
import DirectoryNamedWebpackPlugin from 'directory-named-webpack-plugin';

export default
{
    entry: config.entry(),

    output:
    {
        path: path.resolve(`${process.env.DEST}`),
        publicPath: '/js/',
        filename: '[name].js'
    },

    resolve:
    {
        extensions: ['.ts', '.js', '.json', '.html'],

        alias: config.alias(),

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
            automaticNameDelimiter: '.',
            name: true
        }
    },

    externals:
    [
        /^(jquery|\$)$/i,

        // query jsdelvr on BUILD!
        (context, request, cb) =>
        {
            //console.log(request)

            cb();
        }
    ],

    module:
    {
        rules:
        [
            {
                test: /\.ts?$/,
                loader: 'awesome-typescript-loader',
                options:
                {
                    reportFiles : [`${process.env.SRC}/{js,modules}/**/*.ts`]
                }
            },

            {
                test: /\.html$/,

                loader: 'html-loader',
                options:
                {
                    minimize: true
                }
            }
        ]
    },

    plugins: config.plugins(),

    mode: (__DEV__) ? 'development' : process.env.NODE_ENV,

    devtool: 'source-map',

    devServer:
    {
        contentBase: 'js',
        logLevel: 'warn'
    }
};
