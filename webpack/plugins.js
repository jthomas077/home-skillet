
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HappyPack from 'happypack';

export const plugins = () =>
{
    let plugins =
    [
        new webpack.DefinePlugin(
        {
            __DEV__: __DEV__,
            __HMR__: __HMR__,
        }),

        new webpack.ProvidePlugin(
        {
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),

        new ForkTsCheckerWebpackPlugin(
        {
            workers: parseInt(process.env.PROCESSOR_LEVEL, 10) / 2,
            checkSyntacticErrors: true
        }),

        new HappyPack(
        {
            threads: 4,
            loaders:
            [{
                loader: 'ts-loader',
                options:
                {
                    happyPackMode: true
                }
            }]
        })
    ];

    if (__HMR__)
    {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
};
