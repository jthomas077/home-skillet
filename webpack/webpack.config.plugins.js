
import webpack from 'webpack';

let plugins =
[
    new webpack.DefinePlugin(
    {
        __DEV__: __DEV__
    }),

    new webpack.ProvidePlugin(
    {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
];

if (__DEV__)
{
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = plugins;
