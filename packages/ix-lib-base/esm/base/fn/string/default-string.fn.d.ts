/**
 * 預設字串
 *
 * @example
 * ```
 * defaultString('test', 'default') // 'test'
 * defaultString('', 'default') // ''
 * defaultString(null, 'default') // 'default'
 * defaultString(null, null) // ''
 * ```
 * @param val 傳入的字串
 * @param defaultStr 預設字串
 * @returns 原值或預設字串或空字串
 * @author Clark Chen
 * @version 2021/03/10
 */
export declare function defaultString(str: string, defaultStr?: string): string;
