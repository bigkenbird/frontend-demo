/**
 * 讀取CSS檔
 *
 * @example
 * ```
 * LoadJSUtils.load('test.js')
 * ```
 * @param src js檔來源路徑
 * @param isESModule 是否為ES Module
 * @param maxRetryCount 失敗重試次數上限，不限可設-1
 * @param retryIntervalMills 失敗重試間隔(ms)
 * @param doc Document物件
 * @param count 失敗重試次數
 * @returns
 * @author Clark Chen
 * @version 2021/04/01
 */
export declare function loadCSS(src: string, maxRetryCount?: number, retryIntervalMills?: number, doc?: Document, count?: number, r?: () => void): Promise<void>;
