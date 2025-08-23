import { isBlank } from '../validator/is-blank.fn';
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
export function loadCSS(src, maxRetryCount = 3, retryIntervalMills = 2500, doc = document, count = 0, r = () => { }) {
    return new Promise((resolve, reject) => {
        if (isBlank(src)) {
            reject();
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = src;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        link.onload = link.onreadystatechange = () => {
            if (!link.readyState || link.readyState === 'loaded' || link.readyState === 'complete') {
                // 清除
                link.onload = link.onerror = link.onreadystatechange = null;
                link = null;
                resolve();
            }
        };
        link.onerror = () => {
            // 清除
            link.onload = link.onerror = link.onreadystatechange = null;
            doc.head.removeChild(link);
            link = null;
            count++;
            // 未達錯誤重試上限
            if (count < maxRetryCount) {
                setTimeout(() => {
                    loadCSS(src, maxRetryCount, retryIntervalMills, doc, count, reject).catch(() => {
                        // 執行首個promise的reject()，外部才能觸發catch
                        r();
                    });
                }, retryIntervalMills);
            }
            else {
                reject();
            }
        };
        doc.head.appendChild(link);
    });
}
