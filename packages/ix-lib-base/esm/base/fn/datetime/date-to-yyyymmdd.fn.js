/**
 * Date轉為yyyMMdd字串
 *
 * @example
 * ```
 * date2yyyyMMdd(new Date()) // 20200301
 * date2yyyyMMdd(new Date(), '/') // 2020/03/01
 * date2yyyyMMdd(null) // null
 * ```
 * @param date Date Object
 * @param delimiter 分隔
 * @returns 日期字串 | null
 * @author Clark Chen
 * @version 2021/03/10
 */
export function dateToyyyyMMdd(date, delimiter = '') {
    if (date == null)
        return null;
    return `${date.getFullYear()}${delimiter}${('0' + (date.getMonth() + 1)).slice(-2)}${delimiter}${('0' + date.getDate()).slice(-2)}`;
}
