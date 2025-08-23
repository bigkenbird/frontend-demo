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
export function equalsIgnoreCase(str1, str2) {
    if (str1 == null || str2 == null)
        return false;
    return str1.toLowerCase() === str2.toLowerCase();
}
