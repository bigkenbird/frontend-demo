import { defaultNumber } from '../number/default-number.fn';
import { roundOff } from '../number/round-off.fn';
/**
 * 產生帶有千分號的數值字串，無法判別時回0
 *
 * @example
 * ```
 * commfy(undefined, 0) // 0
 * commfy(null, 3) // 0.000
 * commfy(null, 3, false) // 0
 * commfy({}) // 0
 * commfy(new Date()) // 0
 * commfy(5, 0) // 5
 * commfy(5, 2) // 5.00
 * commfy(5, 2, false) // 5
 * commfy(1234, 0) // 1,234
 * commfy(1234.567, 0) // 1,235
 * commfy(1234.567, 2) // 1,234.57
 * commfy(1234.567, 5) // 1,234.56700
 * commfy(1234.567, 5, false) // 1234.567
 * commfy(-1234.567, 2) // -1,234.57
 * commfy('.5', 0) // 1
 * commfy('1234', 2) // 1,234.00
 * commfy('1234.567', 2)) // 1,234.57
 * commfy('1,234', 2) // 1,234.00
 * commfy('1,234', 2, false) // 1,234
 * commfy('1,234.567', 2) // 1,234.57
 * commfy('-1234.567', 2) // -1,234.57
 * ```
 * @param val
 * @param scale 指定小數位數,預設0,位數不足不會補0
 * @returns 字串
 */
export function commafy(val, scale = 0, scalePadding = true) {
    let num = defaultNumber(val, 0);
    if (num === 0) {
        if (scalePadding && scale > 0)
            return '0' + `${Math.pow(10, scale)}`.replace('1', '.');
        return '0';
    }
    num = roundOff(num, scale);
    let numStr = String(num);
    const hasDot = numStr.indexOf('.') > -1;
    let scaleStr = '';
    if (hasDot) {
        const tokens = numStr.split('.');
        numStr = tokens[0];
        scaleStr = '.' + tokens[1];
        if (scalePadding && scale > tokens[1].length) {
            scaleStr += `${Math.pow(10, scale - tokens[1].length)}`.replace('1', '');
        }
    }
    else if (scalePadding && scale > 0) {
        scaleStr = `${Math.pow(10, scale)}`.replace('1', '.');
    }
    const re = /(-?\d+)(\d{3})/;
    while (re.test(numStr)) {
        numStr = numStr.replace(re, '$1,$2');
    }
    return numStr + scaleStr;
}
