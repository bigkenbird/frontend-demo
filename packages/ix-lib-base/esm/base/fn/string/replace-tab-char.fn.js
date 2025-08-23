import { isBlank } from '../validator/is-blank.fn';
/**
 * 去掉字串中的tab字元
 *
 * @example
 * ```
 * replaceTabChar('\ttest') // 'test'
 * ```
 * @param str 替換字串
 * @param replacement 取代字串,預設為''
 * @returns 替換後字串
 * @author Clark Chen
 * @version 2021/03/10
 */
export function replaceTabChar(str, replacement = '') {
    if (!isBlank(str))
        return str.replace(/\t/g, replacement);
    return str;
}
