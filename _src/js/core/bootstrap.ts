
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
* Imports module(s).
*
*  @param {string|Array<string>} imports Modules to import.
*  @param {string} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
 * @returns {Promise<string[]>} Promise array
*/
export async function importModules (imports: string | Array<string>, el: string | JQuery) : Promise<string[]>
{
    if (!imports.length)
    {
        throw new ReferenceError('You must pass a module to import.');
    }

    imports = Array.isArray(imports) ? imports : [imports];

    await imports.map(async (m) =>
    {
        await import(`../../modules/${m}.ts`)
                .then(({ default: module }) =>
                {
                    initModules(el, (target: string) =>
                        new module(target,
                            JSON.parse(((el.data('module-opts') || '')
                                .replace(/\'/g, '\"') || JSON.stringify({})))));

                    Promise.resolve();
                })
                .catch(err =>
                {
                    Promise.reject(
                        new Error(`There was an error importing your module => ${err}`));
                });
    });

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
    const modules = getInstanceOfjQuery('[data-module]');

    modules.each((idx, el) =>
    {
        el = $(el);

        importModules(el.data('module').toLowerCase(), el);
    });
};


/**
 * Gets all DOM elements to cache in modules.
 * If a DOM element contains `[data-cache]`, the DOM element will be excluded from caching.
 *
 * @param {string|JQuery} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
 * @returns {object} object
 */
export const getCachableDomElements = (element: string | JQuery) : object =>
{
    let cachableDomEls = {};

    element = getInstanceOfjQuery(element);

    const moduleName = element.data('module').split(/\//g).pop();

    let elementClassName = (element.attr('class') || '')
            .split(/\s/g, 1)
            .shift()
            .split(/-/g).map((str, idx) =>
            {
                str = str.split('__', 1).shift();

                return (idx === 0)
                    ? str
                    : str.replace(/^\w/, c => c.toUpperCase());
            })
            .join('');

    element.find(':not([data-cache])').each((idx, el) =>
    {
        el = getInstanceOfjQuery(el);

        const parentElement = el.closest('[data-cache-skip]');

        if (!parentElement.length)
        {
            let className = (el.attr('class') || '')
                                .split(/\s/g, 1)
                                .shift()
                                .replace(/([-a-zA-Z0-9]+)(?:__)?([-a-zA-Z0-9]+)?/gmi, ($0, $1, $2) =>
                                {
                                    $1 = ($1 || '').split(/-/gm).map((str, idx) =>
                                    {
                                        return (idx === 0)
                                            ? str
                                            : str.replace(/^\w/, c => c.toUpperCase());
                                    });

                                    $2 = ($2 || '').split(/-/gm).map((str, idx) =>
                                    {
                                        return str.replace(/^\w/, c => c.toUpperCase());
                                    });

                                    return [...$1, ...$2]
                                        .join('')
                                        .replace(elementClassName, '')
                                        .replace((elementClassName !== moduleName) ? moduleName : '', '')
                                        .replace(/^\w/, c => c.toLowerCase());
                                });


            if (!!className.length)
            {
                const elList = element.find(`.${el.attr('class').split(/\s/g, 1).shift()}`);

                Object.assign(cachableDomEls, { [`${className}`]: elList });
            }
        }
    });

    return cachableDomEls;
};
