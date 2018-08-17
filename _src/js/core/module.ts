
// @ts-ignore
import { getCachableDomElements } from 'core/bootstrap';

// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
 * Abstract Module class in which all modules inherit from.
 */
abstract class Module
{
    protected dom: object = {};
    protected options: object = {};
    protected el: JQuery;

   /**
     * Module constructor
     *
     * @param {string|JQuery} el Main DOM element in any valid jQuery form i.e. `#foo` or `.bar` or `[data-baz]` or an actual jQuery object.
     * @param {Object} [opts={}] Module options.
    */
    protected constructor(private element: string | JQuery, private opts: object = {})
    {
        this.el = getInstanceOfjQuery(element);

        if (typeof this.el === 'undefined' || !this.el.length)
        {
            throw new ReferenceError('You must provide an valid element as a string type or jquery type.');
        }

        Object.assign(this.dom, getCachableDomElements(this.el));
        Object.assign(this.options, opts);

        this.init();
        this.render();
        this.bindEventListeners();
    }

    protected init() : void {};

    protected render() : void {};

    protected bindEventListeners() : void {};
}

export default Module;
