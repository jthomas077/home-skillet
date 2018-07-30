
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
 *
 */
export const renderYear = (el: string | JQuery) : void =>
{
    const $el = getInstanceOfjQuery(el);

    const year = new Date().getUTCFullYear();

    $el.text(year.toString());
};

/**
 * Initializes inline SVG's
 *
 * @param el - DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
 *
 * Reference: https://stackoverflow.com/questions/24933430/img-src-svg-changing-the-fill-color
 */
export const renderSvg = (el: string | JQuery) : void =>
{
    const $el = getInstanceOfjQuery(el);

    $el.each((idx, el) =>
    {
        const $img = $(el);
        const imgID = $img.attr('id');
        const imgClass = $img.attr('class');
        const imgURL = $img.attr('src');

        $.get(imgURL as string, data =>
        {
            // Get the SVG tag, ignore the rest
            let $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined')
            {
                $svg = $svg.attr('id', imgID);
            }

            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined')
            {
                $svg = $svg.attr('class', `${imgClass} replaced-svg`);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width'))
            {
                $svg.attr('viewBox', `0 0 ${$svg.attr('height')} ${$svg.attr('width')}`);
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        },

        'xml');
    });
};
