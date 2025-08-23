import { devWarning } from '../dev/dev-logger-warning.fn';
import { isString } from '../validator/is-string.fn';
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
export function isBlank(val) {
    if (val == null)
        return true;
    if (isString(val))
        return val.trim() === '';
    devWarning(`isBlank()只處理字串,val: ${val}`);
    return false;
}
