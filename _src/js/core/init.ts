
// @ts-ignore
import { discoverModules } from 'core/bootstrap';
// @ts-ignore
import { renderYear, renderSvg } from 'helpers';

export const init = () =>
{
    discoverModules();

    renderSvg('img.svg');

    renderYear('.year');

    if (__DEV__)
    {
        // @ts-ignore
        if (module.hot) module.hot.accept()
    }
};
