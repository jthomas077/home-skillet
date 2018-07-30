
// @ts-ignore
import { discoverModules } from 'core/bootstrap';
// @ts-ignore
import { renderYear, renderSvg } from 'helpers';

export const init = () : void =>
{
    discoverModules();

    renderSvg('img.svg');

    renderYear('.year');
};
