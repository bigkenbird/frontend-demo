/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 是否為array object
 *
 * @example
 * ```
 * isArray(undefined) // false
 * isArray(null)) // false
 * isArray({'isArray': ''}) // false
 * isArray([]) // true
 * isArray(new Array()) // true
 * isArray(23) // false
 * isArray(() => {})) // false
 * ```
 */
export function isArray(val) {
    if (Array.isArray) {
        return Array.isArray(val);
    }
    // 如有其他物件toString()為[object Array]會誤判
    return Object.prototype.toString.call(val) === '[object Array]';
}
