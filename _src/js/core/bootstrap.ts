
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
    Imports module(s).

    @param {string|Array} imports - Modules to import.
    @param {string} element - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
*/
export async function importModules (imports: string | Array<string>, element: string | JQuery) : Promise<string[]>
{
    if (!imports.length)
    {
        throw new ReferenceError('You must pass a module to import.');
    }

    imports = Array.isArray(imports) ? imports : [imports];

    await imports.map(m =>
        (async () =>
        {
            await import(`../../modules/${m}.ts`)
                .then(({ default: module }) =>
                {
                    initModules(element, (target: string) => new module(target))
                })
                .catch(err =>
                {
                    Promise.reject(new Error(`There was an error importing your module => ${err}`));
                })
        })());

    return await Promise.all(imports);
};

/**
      Initializes the module(s)

      @param {string} element - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
      @param {Function} target - Callback
*/
export const initModules = (element: string | JQuery, target: Function) : void =>
{
    const elements = getInstanceOfjQuery(element);

    if (!elements.length)
    {
        throw new ReferenceError('You must pass an valid element.');
    }

    for (let i = 0; i < elements.length; i++)
    {
        target(elements[i]);
    }
};


/**
 * Discovers modules from the DOM tree on elements that have `data-module` specified.
 */
export const discoverModules = () : void =>
{
    $('[data-module]').each((idx, el) =>
    {
        const $el = $(el);

        importModules($el.data('module').toLowerCase(), $el);
    });
};
