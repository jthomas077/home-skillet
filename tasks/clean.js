
import cleaner from 'del';

export const liquidate = () =>
{
    return cleaner(
    [
        `${process.env.DEST}/**`, `!${process.env.DEST}`
    ]);
};
