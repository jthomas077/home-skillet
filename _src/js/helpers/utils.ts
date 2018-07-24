
// @ts-ignore
import { queryStringPattern } from 'helpers/regex';

/**
 * Parses a query string
 *
 * @param query - querystring to parse.
 */
export const getQueryParams = (query: string) =>
{
    let params: object = {};

    query.replace(queryStringPattern,
        // @ts-ignore
        ($0, $1, $2, $3) =>
        {
            const key = $1.toLowerCase();

            Object.assign(params, { [key]: decodeURIComponent($3) });
        });

    return params;
};

/**
 * @param el - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
 * @returns jQuery object
 */
export const getInstanceOfjQuery = (el: string | JQuery) =>
{
    return !(el instanceof jQuery) ? $(el as string) : el as JQuery;
};
