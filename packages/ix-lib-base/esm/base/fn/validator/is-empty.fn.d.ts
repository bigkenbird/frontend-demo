/**
 * 是否為空字串
 * - **注意與isBlank()有差異**
 *
 * @example
 * ```
 * isEmpty(undefined) // true
 * isEmpty(null)      // true
 * isEmpty('')        // true
 * isEmpty(' ')       // false
 * isEmpty(0)         // false
 * isEmpty({})        // false
 * ```
 * @param str 判斷字串
 * @returns
 * @author Clark Chen
 * @version 2021/03/10
 */
export declare function isEmpty(val: any): boolean;
