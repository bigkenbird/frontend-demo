import { isBlank } from '../validator/is-blank.fn';
/**
 * 替換所有指定字串
 *
 * @example
 * ```
 * replaceAll('abcb', 'b', 'd') // return 'adcd'
 * replaceAll(null, 'b', 'd')   // return null
 * replaceAll('test', null, 'd')   // return 'test'
 * replaceAll('test', 'b', null)   // return 'test'
 * ```
 * @param str 替換字串
 * @param regex 要替換RegExp的條件
 * @param replacement 取代字串
 * @returns 替換後字串
 * @author Clark Chen
 * @version 2021/03/10
 */
export function replaceAll(str, regex, replacement) {
    if (isBlank(str) || regex == null || replacement == null)
        return str;
    return str.replace(new RegExp(regex, 'g'), replacement);
}
