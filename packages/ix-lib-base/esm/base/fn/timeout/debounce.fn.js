/**
 * function在延遲時間內重覆觸發時，會持續延遲，直到超過延遲時間沒再觸發，才會執行callback
 *
 * 或是(當參數callbackFirst=true)先執行callback，再持續延遲
 *
 * @example
 * ```
 * // scroll事件彼此在1000ms內持續發生時，直到最後一次事件&超過1000ms沒再觸發，才會執行callback
 * window.addEventListener('scroll', debounceCallback((e: Event) => {}, 1000));
 * // scroll事件彼此在1000ms內持續發生時，會先執行callback再遞延直到最後一次事件&超過1000ms沒再觸發，才能再次觸發callback
 * window.addEventListener('scroll', debounceCallback((e: Event) => {}, 1000), true);
 * ```
 * @param callback
 * @param delay 延遲時間(ms)
 * @param callbackFirst true:先執行callback，再遞延 false:持續遞延，作後才執行callback
 * @author Clark Chen
 * @version 2021/03/10
 */
export function debounce(callback, delay = 300, callbackFirst = false) {
    let handle;
    if (delay == null) {
        // delay無值時直接回傳callback
        return callback;
    }
    else if (callbackFirst) {
        // 是否已執行過callback
        let execCallback = false;
        return (...args) => {
            if (!execCallback) {
                callback(...args);
                execCallback = true;
            }
            clearTimeout(handle);
            handle = window.setTimeout(() => {
                execCallback = false;
            }, delay);
        };
    }
    else {
        return (...args) => {
            clearTimeout(handle);
            handle = window.setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }
}
// 以下舊寫法 @deprecated
// let handle = 0;
// const map = new Map<number, CustomDebounce>();
// /**
//  * function在延遲時間內即使重覆執行，也只會執行一次
//  *
//  * @example
//  * ```
//  * // 連續呼叫兩次
//  * let flag;
//  * flag = debounce(flag, () => { console.log('run1') });
//  * flag = debounce(flag, () => { console.log('run2') }); // 延遲時間到，只會執行run2
//  * ```
//  * @param flag delayRun()用的setTimeout註記
//  * @param handler 延遲時間到執行的function
//  * @param delay 延遲時間(ms)
//  * @author Clark Chen
//  * @version 2021/03/10
//  */
// export function debounce(flag = 0, handler: () => void, delay = 600): number {
//   if (flag != null && flag > 0) {
//     if (map.has(flag)) {
//       const debounce = <CustomDebounce>map.get(flag);
//       if (debounce) {
//         debounce.run(handler, delay);
//         return flag;
//       }
//     }
//   }
//   handle++;
//   const debounce = new CustomDebounce(handle);
//   debounce.run(handler, delay);
//   map.set(handle, debounce);
//   return handle;
// }
// class CustomDebounce {
//   private seq = 0;
//   private handle = 0;
//   constructor(seq: number) {
//     this.seq = seq;
//   }
//   run(handler: () => void, delay = 600): void {
//     if (this.handle != null && this.handle > 0) {
//       window.clearTimeout(this.handle);
//       this.handle = null;
//     }
//     this.handle = window.setTimeout(() => {
//       handler();
//       this.handle = null;
//       map.delete(this.seq);
//     }, delay);
//   }
// }
