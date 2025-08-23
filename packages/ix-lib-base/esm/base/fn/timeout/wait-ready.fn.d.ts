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
export declare function waitReady(ready: (count?: number) => boolean, countMax?: number, checkInterval?: number): Promise<boolean>;
