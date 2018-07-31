
// @ts-ignore
import { TweenMax, Expo } from 'gsap';
import 'gsap/ScrollToPlugin';

/**
 * Opens an element
 *
 * @param {string} el DOM element
 * @param {number} speed Speed of animation
 * @param {string} ease Ease type
 * @param {Function} onComplete On complete callback
 */
export const open = (el: string, speed: number = 0.4, ease: string = 'easeOut', onComplete: Function): void =>
{
    TweenMax.set(el, { height: 'auto' });
    TweenMax.from(el, speed, { height: 0, ease: Expo[ease], onComplete });
};

/**
 * Closes an element
 *
 * @param {string} el DOM element
 * @param {number} speed Speed of animation
 * @param {string} ease Ease type
 * @param {Function} onComplete On complete callback
 */
export const close = (el: string, speed: number = 0.4, ease: string = 'easeOut', onComplete: Function): void =>
{
    TweenMax.to(el, speed, { height: 0, ease: Expo[ease], onComplete });
};

/**
 * Slides an element on the x-axis
 *
 * @param {string} el DOM element
 * @param {number} speed Speed of animation
 * @param {number} x x-axis offset
 * @param {string} ease Ease type
 * @param {Function} onComplete On complete callback
 */
export const slide = (el: string, speed: number = 0.4, x: number = 0, ease: string = 'easeOut', onComplete: Function): void =>
{
    TweenMax.to(el, speed, { x, ease: Expo[ease], onComplete });
};

/**
 * Scroll to point on a page
 *
 * @param {number} y Position to scroll to
 * @param {string} ease Ease type
 * @param {Function} onComplete On complete callback
 */
export const scrollTo = (y: number, speed: number = 1.5, ease: string = 'easeOut', onComplete: Function): void =>
{
    TweenMax.to(window, speed, { scrollTo: { y }, ease: Expo[ease], onComplete });
};
