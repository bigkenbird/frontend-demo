/* eslint-disable @typescript-eslint/no-explicit-any */
import { devWarning } from '../dev/dev-logger-warning.fn';
import { isString } from '../validator/is-string.fn';
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
export function isEmpty(val) {
    if (val == null)
        return true;
    if (isString(val))
        return val === '';
    devWarning(`isEmpty()只處理字串,val:${val}`);
    return false;
}
