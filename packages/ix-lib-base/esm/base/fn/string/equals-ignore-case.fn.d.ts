/**
 * 字串忽略大小寫比較
 *
 * @example
 * ```
 * equalsIgnoreCase(null, undefined) // false, 其中之一為null皆回傳false
 * equalsIgnoreCase(null, 's')  // false, 其中之一為null皆回傳false
 * equalsIgnoreCase('S', 's')   // true
 * ```
 */
export declare function equalsIgnoreCase(str1: string, str2: string): boolean;
