/**
 * 取得Server時間(ms)
 */
export declare function getServerTime(): number;
/**
 * 更新Server時間,會由每個sendAndReceive response時更新
 *
 * @param time - time number
 */
export declare function setServerTime(time: number): void;
/**
 * 取得Server時間的Date物件，需注意不同時區由物件取得的日時分秒是不同的
 */
export declare function getServerDate(): Date;
