
import empty from 'delete-empty';
import cleaner from 'del';
import path from 'path';
import turbo from 'turbocolor';

export const bagit_n_tagit = () =>
{
    cleaner([`${process.env.DEST}/modules/**/_*.html`]);

    return empty(process.env.DEST)
            .then(deleted =>
            {
                deleted.forEach(purged =>
                    console.log(`${turbo.green(`    Purged =>`)}`, `${purged.replace(path.resolve(process.env.DEST), '').replace(/\\/g, '/')}`));
            })
            .catch(console.error);
};
