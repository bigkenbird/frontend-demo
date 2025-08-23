/**
 * 是否為數字或數值字串
 *
 * @example
 * ```
 * isNumeric(undefined) // false
 * isNumeric(null)      // false
 * isNumeric('')        // false
 * isNumeric(' ')       // false
 * isNumeric(0)         // true
 * isNumeric(123)       // true
 * isNumeric('-123.456')    // true
 * isNumeric('-1,123.456')  // false
 * isNumeric({})        // false
 * isNumeric(new Date())// false
 * ```
 */
export declare function isNumeric(val: any): boolean;
