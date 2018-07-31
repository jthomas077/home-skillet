
// @ts-ignore
import { init } from 'core/init';

$(() =>
{
    init();

    if (__HMR__ && module.hot)
    {
        module.hot.accept();
    }
});
