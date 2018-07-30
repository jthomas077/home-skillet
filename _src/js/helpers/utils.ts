
// @ts-ignore
import { queryStringPattern } from 'helpers/regex';

/**
 * Parses a query string
 *
 * @param query - querystring to parse.
 */
export const getQueryParams = (query: string) : object =>
{
    let params: object = {};

    query.replace(queryStringPattern,
        // @ts-ignore
        ($0, key, $1, value) =>
        {
            key = key.toLowerCase();

            Object.assign(params, { [key]: decodeURIComponent(value) });
        });

    return params;
};

/**
 * @param el - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
 * @returns jQuery object
 */
export const getInstanceOfjQuery = (el: string | JQuery) : JQuery =>
{
    return !(el instanceof jQuery) ? $(el as string) : el as JQuery;
};
