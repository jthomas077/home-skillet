
// @ts-ignore
import { TweenMax, Expo } from 'gsap';
import 'gsap/ScrollToPlugin';

/**
 * Opens an element
 *
 * @param el - DOM element
 * @param speed - Speed of animation
 * @param ease - Ease function
 * @param onComplete - On complete callback
 */
export const open = (el: string, speed: number = 0.4, ease: string = 'easeOut', onComplete: Function) =>
{
    TweenMax.set(el, { height: 'auto' });
    TweenMax.from(el, speed, { height: 0, ease: Expo[ease], onComplete });
};

/**
 * Closes an element
 *
 * @param el - DOM element
 * @param speed - Speed of animation
 * @param ease - Ease function
 * @param onComplete - On complete callback
 */
export const close = (el: string, speed: number = 0.4, ease: string = 'easeOut', onComplete: Function) =>
{
    TweenMax.to(el, speed, { height: 0, ease: Expo[ease], onComplete });
};

/**
 * Slides an element on the x-axis
 *
 * @param el - DOM element
 * @param speed - Speed of animation
 * @param x - x-axis offset
 * @param ease - Ease function
 * @param onComplete - On complete callback
 */
export const slide = (el: string, speed: number = 0.4, x:number = 0, ease: string = 'easeOut', onComplete: Function) =>
{
    TweenMax.to(el, speed, { x, ease: Expo[ease], onComplete });
};

/**
 * Scroll to point on a page
 *
 * @param y - Position to scroll to
 * @param speed - Speed of animation
 * @param onComplete - On complete callback
 */
export const scrollTo = (y: number, speed: number = 1.5, ease: string = 'easeOut', onComplete: Function) =>
{
    TweenMax.to(window, speed, { scrollTo: { y }, ease: Expo[ease], onComplete });
};
