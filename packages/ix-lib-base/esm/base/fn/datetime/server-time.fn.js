import { devWarning } from '../dev/dev-logger-warning.fn';
/** server time,會由每個sendAndReceive response時更新*/
let serverTime = 0;
/** server time interval key, 會刷新serverTime變數 */
let handle;
/**
 * 取得Server時間(ms)
 */
export function getServerTime() {
    if (serverTime === 0) {
        devWarning('無serverTime');
    }
    return serverTime;
}
/**
 * 更新Server時間,會由每個sendAndReceive response時更新
 *
 * @param time - time number
 */
export function setServerTime(time) {
    // 不合法的值不處理
    if (time == null || typeof time != 'number') {
        devWarning('ServerTime時間資料不正確');
        return;
    }
    serverTime = time;
    // 清除已存在的interval
    if (handle != null)
        clearInterval(handle);
    // 建立新的interval
    handle = window.setInterval(() => {
        serverTime = serverTime + 1000;
    }, 1000);
}
/**
 * 取得Server時間的Date物件，需注意不同時區由物件取得的日時分秒是不同的
 */
export function getServerDate() {
    return new Date(getServerTime());
}
