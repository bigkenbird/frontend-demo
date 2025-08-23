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
export declare function isArray(val: any): boolean;
