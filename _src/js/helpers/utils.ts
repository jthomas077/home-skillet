
// @ts-ignore
import { queryStringPattern } from 'helpers/regex';

/**
 * Parses a query string
 *
 * @param {string} query Querystring to parse.
 * @returns {object} key-value object
 */
export const getQueryParams = (query: string) : object =>
{
    let params: object = {};

    query.replace(queryStringPattern,
        // @ts-ignore
        ($0, key: string, $1, value: string) =>
        {
            key = key.toLowerCase();

            Object.assign(params, { [key]: decodeURIComponent(value) });
        });

    return params;
};

/**
 * Determines if the element is an instance of jQuery or gets a jQuery instance
 *
 * @param {string|HTMLElement|JQuery} el DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
 * @returns {jQuery} JQuery object
 */
export const getInstanceOfjQuery = (el: string | HTMLElement | JQuery) : JQuery =>
{
    return !(el instanceof jQuery) ? $(el as string) : el as JQuery;
};
