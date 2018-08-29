
// @ts-ignore
import { getCachableDomElements } from 'core/bootstrap';

// @ts-ignore
import { getInstanceOfjQuery } from 'helpers/utils';

/**
 * Abstract Module class.
 * All modules inherit from this class.
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

        Object.assign(this.options, opts);

        this.preInit();
        this.init();
        this.updateDom();
        this.bindEventListeners();
        this.render();

        if (__DEV__)
        {
            const moduleName = this.el.data('module').split(/\//g).pop();

            if (!!Object.keys(this.dom).length)
            {
                console.log(`Cached DOM for module: ${moduleName} =>`, this.dom);
            }

            if (!!Object.keys(this.options).length)
            {
                console.log(`Options for module: ${moduleName} =>`, this.options);
            }
        }
    }

    /**
     * @abstract
     */
    protected preInit() : void {};

    /**
     * @abstract
     */
    protected init() : void {};

    /**
     * @abstract
     */
    protected render() : void {};

    /**
     * @abstract
     */
    protected bindEventListeners() : void {};

    protected updateDom() : void
    {
        Object.assign(this.dom, getCachableDomElements(this.el));
    };
}

export default Module;
