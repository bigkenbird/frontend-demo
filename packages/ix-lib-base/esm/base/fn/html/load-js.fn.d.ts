/**
 * 讀取js檔,後續同src的就不會再多讀取
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
export declare function loadJS(src: string, isESModule?: boolean, maxRetryCount?: number, retryIntervalMills?: number, doc?: Document, removeTag?: boolean, count?: number, rj?: () => void): Promise<void>;
