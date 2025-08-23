/**
 * 加減天數
 * @param date
 * @param number
 * @returns
 */
export function addDay(date, number) {
    if (date == null)
        return null;
    // 一天 86400000(ms) = 60 * 60 * 24 * 1000
    return new Date(date.getTime() + 86400000 * number);
}
