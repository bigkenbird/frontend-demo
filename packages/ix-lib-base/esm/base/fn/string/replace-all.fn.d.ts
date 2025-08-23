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
export declare function replaceAll(str: string, regex: string, replacement: string): string;
