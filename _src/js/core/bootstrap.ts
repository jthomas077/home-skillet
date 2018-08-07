
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
* Imports module(s).
*
*  @param {string|Array<string>} imports Modules to import.
*  @param {string} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
*/
export async function importModules (imports: string | Array<string>, el: string | JQuery) : Promise<string[]>
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
                    initModules(el, (target: string) => new module(target))
                })
                .catch(err =>
                {
                    Promise.reject(new Error(`There was an error importing your module => ${err}`));
                })
        })());

    return await Promise.all(imports);
};

/**
* Initializes the module(s)
*
* @param {string|JQuery} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
* @param {Function} target - Callback
*/
export const initModules = (el: string | JQuery, target: Function) : void =>
{
    const elements = getInstanceOfjQuery(el);

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
 * Discovers modules from the DOM on elements that have `data-module` specified.
 */
export const discoverModules = () : void =>
{
    $('[data-module]').each((idx, el) =>
    {
        const $el = $(el);

        importModules($el.data('module').toLowerCase(), $el);
    });
};


/**
 * Gets all DOM elements to cache in modules.
 * If a DOM element contains `[data-cache]`, the DOM element will be excluded from caching.
 *
 * @param {string|JQuery} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
 * @returns {object} object
 */
export const getCachableDomElements = (el: string | JQuery) : object =>
{
    let cachableDomEls = {};

    el = getInstanceOfjQuery(el);

    el.find(':not([data-cache])').each((idx, element) =>
    {
        const $el = getInstanceOfjQuery(element);
        const className = $el.attr('class')!.split(' ').shift();

        if (typeof className !== 'undefined' && !!className.length)
        {
            Object.assign(cachableDomEls, { [`$${className}`]: $el });
        }
    });

    return cachableDomEls;
};
