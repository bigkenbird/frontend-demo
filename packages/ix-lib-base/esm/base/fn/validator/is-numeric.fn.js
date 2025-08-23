/* eslint-disable @typescript-eslint/no-explicit-any */
import { devWarning } from '../dev/dev-logger-warning.fn';
import { isString } from '../validator/is-string.fn';
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
export function isNumeric(val) {
    if (val == null)
        return false;
    if (typeof val === 'number')
        return true;
    // Number('null') Number('') Number(' ') 都會是return 0
    if (isString(val)) {
        if (val.trim() === '')
            return false;
        return !isNaN(Number(val));
    }
    devWarning(`isNumeric()只處理數值與數值字串,val:${val}`);
    return false;
}
