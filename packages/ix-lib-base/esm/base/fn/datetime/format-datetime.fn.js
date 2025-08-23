/**
 * 將date轉為[西元年, 月(已加1), 日, 時, 分, 秒, 毫秒]陣列
 *
 * 注意：傳入的date是否為臺灣年月日時分秒的date物件，不同時區會造成資料差異
 *
 * @example
 * ```
 * dateToArrayFormat(new Date(1628178859745)) // [2021, 8, 5, 23, 54, 19, 745]
 * ```
 */
function dateToArrayFormat(date) {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
}
/**
 * 將time轉為[西元年, 月(已加1), 日, 時, 分, 秒, 毫秒]
 *
 * 注意：傳入的time是否為已處理過time，不同時區會造成資料差異
 *
 * @example
 * ```
 * timeToArray(1628178859745) // [2021, 8, 5, 23, 54, 19, 745]
 * ```
 * @param time
 * @param tst 是否轉為臺灣年月日時分秒
 * @returns
 */
function timeToArrayFormat(time, tst = true) {
    const date = tst ? getTaiwanDate(time) : new Date(time);
    return dateToArrayFormat(date);
}
/**
 * 由pattern轉為時間字串
 *
 * @param pattern 簡易版用'yyyy' 'MM' 'dd' 'HH' 'mm' 'ss' 'SSS'當作取代的標記
 * @param data 陣列 [西元年, 月(已加1), 日, 時, 分, 秒, 毫秒]
 * @returns
 */
function replaceDatePattern(pattern, data) {
    return pattern
        .replace(/yyyy/, `${data[0]}`)
        .replace(/MM/, ('0' + data[1]).slice(-2))
        .replace(/dd/, ('0' + data[2]).slice(-2))
        .replace(/HH/, ('0' + data[3]).slice(-2))
        .replace(/mm/, ('0' + data[4]).slice(-2))
        .replace(/ss/, ('0' + data[5]).slice(-2))
        .replace(/SSS/, `${data[6]}`);
}
/**
 * 由pattern格式化time
 * 注意：傳入的time是否為已處理過time，不同時區會造成資料差異
 *
 * @param time
 * @param pattern 簡易版用'yyyy' 'MM' 'dd' 'HH' 'mm' 'ss' 'SSS'當作取代的標記
 * @param tst 是否轉為臺灣年月日時分秒，預設true，設false在不同時區會取得不同的結果
 * @returns
 */
export function formatTime(time, pattern = 'yyyy/MM/dd HH:mm:ss.SSS', tst = true) {
    return replaceDatePattern(pattern, timeToArrayFormat(time, tst));
}
/**
 * 由pattern格式化date
 * 注意：傳入的date是否為臺灣年月日時分秒的date物件，不同時區會造成資料差異
 *
 * @param date
 * @param pattern 簡易版用'yyyy' 'MM' 'dd' 'HH' 'mm' 'ss' 'SSS'當作取代的標記
 * @returns
 */
export function formatDate(date, pattern = 'yyyy/MM/dd HH:mm:ss.SSS') {
    return replaceDatePattern(pattern, dateToArrayFormat(date));
}
/**
 * 取得台灣年月日時分秒的Date物件
 *
 * Date物件無法直接設定時區，會是由當下瀏覽器決定，所以做法是調整time的值以讓Date物件可取得台灣的年月日時分秒
 * 但Date物件裡的TimezoneOffset還是當下時區
 *
 * @param time
 * @author Clark Chen
 * @version 2021/03/10
 * @returns
 */
export function getTaiwanDate(time) {
    // 臺灣時區ZoneOffset
    const taipeiTimezoneOffset = -480;
    return new Date(time + 60000 * (new Date().getTimezoneOffset() - taipeiTimezoneOffset));
}
