
import empty from 'delete-empty';
import cleaner from 'del';
import path from 'path';

export const bagit_n_tagit = () =>
{
    cleaner([`${process.env.DEST}/modules/**/_*.html`]);

    return empty(process.env.DEST)
            .then(deleted =>
            {
                deleted.forEach(purged =>
                    console.log('       purged =>', purged.replace(path.resolve(process.env.DEV), '').replace(/\\/g, '/')));
            })
            .catch(console.error);
};
