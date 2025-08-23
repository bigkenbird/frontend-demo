/**
 * 延遲
 *
 * @example
 * ```
 * // 延遲1秒
 * delay(1000).then(() => { // do something });
 *
 * // 搭配async await
 * await delay();
 * ```
 * @param timeout 延遲時間(ms)，預設為0
 * @returns
 */
export function delay(timeout = 0) {
    return new Promise((resovle) => {
        setTimeout(resovle, timeout);
    });
}
