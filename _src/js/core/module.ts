
// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
 *
 */
abstract class Module
{
    private dom: object = {};
    private options: object = {};
    private el: JQuery;

   /**
     * Module constructor
     *
     * @param {string|JQuery} el - Main DOM element in any valid jQuery form i.e. '#foo' or '.bar' or '[data-baz]' or an actual jQuery object.
     * @param {Object} [opts={}] - Module options.
    */
    protected constructor(el: string | JQuery, opts: object = {})
    {
        this.el = getInstanceOfjQuery(el);

        if (typeof this.el === 'undefined' || !this.el.length)
        {
            throw new ReferenceError('You must provide an valid element as a string type or jquery type.');
        }

        Object.assign(this.options, opts);

        this.init();
        this.render();
        this.bindEventListeners();
    }

    /**
     * @abstract
     */
    abstract init() : void;

    /**
     * @abstract
     */
    abstract render() : void;

    /**
     * @abstract
     */
    abstract bindEventListeners() : void;
}

export default Module;
