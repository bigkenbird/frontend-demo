/* eslint-disable @typescript-eslint/no-explicit-any */
import { replaceAll } from '../string/replace-all.fn';
import { isNumeric } from '../validator/is-numeric.fn';
import { isString } from '../validator/is-string.fn';
/**
 * 預設數值，帶有千分號數值字串會轉為數字回傳
 *
 * @example
 * ```
 * defaultNumber(undefined) // 0
 * defaultNumber(null, 99) // 99
 * defaultNumber('', 99) // 99
 * defaultNumber({}, 99) // 99
 * defaultNumber(new Date(), 99) // 99
 * defaultNumber('1,234.567', 99) // 1234.567
 * defaultNumber('-1,234.567', 99) // -1234.567
 * defaultNumber(0, 99) // 0
 * defaultNumber(1234, 99) // 1234
 * defaultNumber(1234.5, 99) // 1234.5
 * ```
 * @param val
 * @param defaultNumber 預設數值,預設為0
 * @returns 原數值或預設
 * @author Clark Chen
 * @version 2021/03/10
 */
export function defaultNumber(val, defaultNumber = 0) {
    if (isString(val)) {
        val = replaceAll(val, ',', '');
    }
    if (isNumeric(val)) {
        return Number(val);
    }
    return defaultNumber;
}
