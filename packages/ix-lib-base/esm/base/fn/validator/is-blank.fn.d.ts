/**
 * 是否為空字串
 * - **注意與isEmpty()有差異**
 *
 * @example
 * ```
 * isBlank(undefined) // true
 * isBlank(null)      // true
 * isBlank('')        // true
 * isBlank(' ')       // true
 * isBlank(0)         // false
 * isBlank({})        // false
 * ```
 */
export declare function isBlank(val: unknown): boolean;
