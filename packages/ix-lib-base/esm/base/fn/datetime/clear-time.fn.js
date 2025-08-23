/**
 * 清除Date的時分秒毫秒
 *
 * @example
 * ```
 * clearTime(Date{2019/03/15 13:01:55.999}) // Date{2019/03/15 00:00:00.000}
 * ```
 */
export function clearTime(date) {
    if (date != null)
        date.setHours(0, 0, 0, 0);
}
