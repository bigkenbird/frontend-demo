/** 紀錄使用setTimeout的flag，用於換頁時可以清除 */
let flags = [];
/**
 * 自訂的setTimeout，會額外記錄setTimeoutFlag於換頁時一併清除等待的setTimeout
 * @param func - 同setTimoeut第一個參數
 * @param mills - 同setTimeout第二個參數
 */
export function setCustomTimeout(handler, timeout) {
    const flag = window.setTimeout(handler, timeout);
    flags.push(flag);
    return flag;
}
/**
 * 清除使用setTimeout的flag,避免換頁後繼續執行
 */
export function clearCustomTimeout(flag) {
    if (flag != null) {
        window.clearTimeout(flag);
    }
}
export function clearCustomTimeoutAll() {
    if (flags.length > 0) {
        const len = flags.length;
        for (let i = 0; i < len; i++) {
            window.clearTimeout(flags[i]);
        }
    }
    flags = [];
}
