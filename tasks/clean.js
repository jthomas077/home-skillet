
import cleaner from 'del';
import tsConfig from '../tsconfig';

export const liquidate = () =>
{
    return cleaner(
    [
        `${tsConfig.awesomeTypescriptLoaderOptions.cacheDirectory}`,
        `${process.env.DEST}/**`, `!${process.env.DEST}`
    ]);
};
