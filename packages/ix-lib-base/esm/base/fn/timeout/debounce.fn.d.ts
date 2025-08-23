/**
 * function在延遲時間內重覆觸發時，會持續延遲，直到超過延遲時間沒再觸發，才會執行callback
 *
 * 或是(當參數callbackFirst=true)先執行callback，再持續延遲
 *
 * @example
 * ```
 * // scroll事件彼此在1000ms內持續發生時，直到最後一次事件&超過1000ms沒再觸發，才會執行callback
 * window.addEventListener('scroll', debounceCallback((e: Event) => {}, 1000));
 * // scroll事件彼此在1000ms內持續發生時，會先執行callback再遞延直到最後一次事件&超過1000ms沒再觸發，才能再次觸發callback
 * window.addEventListener('scroll', debounceCallback((e: Event) => {}, 1000), true);
 * ```
 * @param callback
 * @param delay 延遲時間(ms)
 * @param callbackFirst true:先執行callback，再遞延 false:持續遞延，作後才執行callback
 * @author Clark Chen
 * @version 2021/03/10
 */
export declare function debounce<P>(callback: (...args: P[]) => void, delay?: number, callbackFirst?: boolean): (...args: P[]) => void;
