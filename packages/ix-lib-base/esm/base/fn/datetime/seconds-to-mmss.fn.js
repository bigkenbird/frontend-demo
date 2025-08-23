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
export function secondsTommss(seconds, pattern = 'mm:ss') {
    if (seconds == null || seconds < 0)
        seconds = 0;
    const sec = seconds % 60;
    const min = (seconds - sec) / 60;
    pattern = pattern.indexOf('mm') > -1 ? pattern.replace(/mm/, ('0' + min).slice(-2)) : pattern.replace(/m/, `${min}`);
    pattern = pattern.indexOf('ss') > -1 ? pattern.replace(/ss/, ('0' + sec).slice(-2)) : pattern.replace(/s/, `${sec}`);
    return pattern;
}
