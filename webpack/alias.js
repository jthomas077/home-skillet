
import path from 'path';

export const alias = () =>
{
    const alias =
    {
        core: path.resolve(`${process.env.SRC}/js/core`),
        helpers: path.resolve(`${process.env.SRC}/js/helpers`),
        modules: path.resolve(`${process.env.SRC}/modules`)
    };

    return alias;
};
