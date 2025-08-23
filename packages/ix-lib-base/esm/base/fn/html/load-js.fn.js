import { isBlank } from '../validator/is-blank.fn';
/**
 * 已Insert的JS來源
 */
const loadedList = [];
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
export function loadJS(src, isESModule = false, maxRetryCount = 3, retryIntervalMills = 2500, doc = document, removeTag = true, count = 0, rj = () => { }) {
    return new Promise((resolve, reject) => {
        if (isBlank(src)) {
            reject();
            return;
        }
        if (loadedList.indexOf(src) > -1) {
            resolve();
            return;
        }
        // 使用HTMLScriptElement會讓後續onreadystatechange,readyState找不到先改用any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let script = doc.createElement('script');
        // const script: HTMLScriptElement = doc.createElement<'script'>('script');
        script.src = src;
        script.async = true;
        script.defer = true; // DOMContentLoaded前才生效
        if (isESModule)
            script.type = 'module';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        script.onload = script.onreadystatechange = () => {
            if (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete') {
                // 清除
                script.onload = script.onerror = script.onreadystatechange = null;
                if (removeTag)
                    doc.head.removeChild(script);
                script = null;
                loadedList.push(src);
                resolve();
            }
        };
        script.onerror = () => {
            // 清除
            script.onload = script.onerror = script.onreadystatechange = null;
            doc.head.removeChild(script);
            script = null;
            count++;
            // 未達錯誤重試上限
            if (count < maxRetryCount) {
                setTimeout(() => {
                    loadJS(src, isESModule, maxRetryCount, retryIntervalMills, doc, removeTag, count, reject).catch(() => {
                        // 執行首個promise的reject()，外部才能觸發catch
                        rj();
                    });
                }, retryIntervalMills);
            }
            else {
                reject();
            }
        };
        doc.head.appendChild(script);
    });
}
