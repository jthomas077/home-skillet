
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
    Imports a module.

    @param {string|Array} imports - Modules to import.
    @param {string} element - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
*/
export const importModule = (imports: string | Array<string>, element: string | JQuery) =>
{
    if (imports.length === 0)
    {
        throw new Error('You must pass in a module to import.');
    }

    imports = Array.isArray(imports) ? imports : [imports];

    imports.map(m => (async () =>
    {
        await import(`../../${m}.ts`)
            .then(({ default: module }) =>
            {
                initModule(element, (target: string) => new module(target));
            })
            .catch(err => console.error('There was an error importing your module => ', err))
    })());
};

/**
      Instantiates or renders the module(s)

      @param {string} element - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
      @param {Function} target - Callback
*/
export const initModule = (element: string | JQuery, target: Function, loosygoosy?: boolean) =>
{
    let $elements = getInstanceOfjQuery(element);

    if (!loosygoosy && !$elements.length)
    {
        throw new ReferenceError('You must pass an valid element in');
    }

    for (let i = 0; i < $elements.length; i++)
    {
        target($elements[i]);
    }
};


/**
 * Discovers modules from the DOM tree on elements that have `data-module` specified.
 */
export const discoverModules = () =>
{
    $('[data-module]').each((idx, el) =>
    {
        const $el = $(el);

        importModule($el.data('module').toLowerCase(), $el);
    });
};


/**
    Check if an element exists anywhere in the DOM tree

    @param el: string - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]'
    @returns boolean - Returns `true` if element is found and `false` if not
*/
export const exists = (el: string) =>
{
    return document.querySelector(el) !== null;
};
