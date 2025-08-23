/**
 * 秒數轉為分鐘與秒數
 *
 * @example
 * ```
 * seconds2mmss(1) // 00:01
 * seconds2mmss(61) // 01:01
 * seconds2mmss(1, 'mm分ss秒') // 00分01秒
 * seconds2mmss(1, 'm分s秒') // 0分1秒
 * seconds2mmss(100, 's秒') // 40秒
 * seconds2mmss(333, 'm分') // 5分
 * seconds2mmss(333, 'mm分') // 05分
 * ```
 */
export declare function secondsTommss(seconds: number, pattern?: string): string;
