/**
 * 自訂的setTimeout，會額外記錄setTimeoutFlag於換頁時一併清除等待的setTimeout
 * @param func - 同setTimoeut第一個參數
 * @param mills - 同setTimeout第二個參數
 */
export declare function setCustomTimeout(handler: TimerHandler, timeout: number): number;
/**
 * 清除使用setTimeout的flag,避免換頁後繼續執行
 */
export declare function clearCustomTimeout(flag?: number): void;
export declare function clearCustomTimeoutAll(): void;
