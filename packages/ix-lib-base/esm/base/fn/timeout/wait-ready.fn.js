/**
 * 等待檢查條件達成
 *
 * @example
 * ```
 * waitReady().then((result: boolean) => {});
 *
 * // 搭配async await
 * const result = awiat waitReady(() => {return true;});
 * ```
 * @param ready ready callback
 * @param countMax 計數上限 -1:無上限
 * @param checkInterval 檢查條件間隔(ms)
 * @returns
 * @author Clark Chen
 * @version 2021/03/10
 */
export function waitReady(ready, countMax, checkInterval) {
    return new Promise((resolve) => {
        window.requestAnimationFrame(() => {
            recursiveCheck(resolve, ready, 0, countMax, checkInterval);
        });
    });
}
/**
 * 遞迴檢查條件是否已完成
 *
 * @param resolve Promise resolve
 * @param ready ready callback
 * @param count 計數
 * @param countMax 計數上限
 * @param checkInterval 檢查條件間隔(ms)
 * @returns
 * @author Clark Chen
 * @version 2021/03/10
 */
function recursiveCheck(resolve, ready, count, countMax = 30, checkInterval = 300) {
    count++;
    if (ready(count)) {
        resolve(true);
    }
    else {
        if (countMax > -1 && count >= countMax) {
            resolve(false);
            return;
        }
        setTimeout(() => {
            recursiveCheck(resolve, ready, count, countMax, checkInterval);
        }, checkInterval);
    }
}
