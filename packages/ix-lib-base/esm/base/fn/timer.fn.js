import { clearCustomInterval, setCustomInterval } from './timeout/interval.fn';
// let handle = 0;
// const map = new Map<number, Timer>();
// export function newTimer(seconds: number, tickCallback: (countdownSec: number) => void, tickInterval = 1000): number {
//   const timer = new Timer(seconds, tickCallback, tickInterval);
//   timer.start();
//   handle++;
//   map.set(handle, timer);
//   return handle;
// }
// export function startTimer(handle: number): void {
//   const timer: Timer | undefined = getTimer(handle);
//   if (timer != null) timer.start();
// }
// export function stopTimer(handle: number): void {
//   const timer: Timer | undefined = getTimer(handle);
//   if (timer != null) timer.stop();
// }
// export function resetTimer(handle: number): void {
//   const timer: Timer | undefined = getTimer(handle);
//   if (timer != null) timer.reset();
// }
// export function cancelTimer(handle: number): void {
//   const timer: Timer | undefined = getTimer(handle);
//   if (timer != null) timer.cancel();
//   map.delete(handle);
// }
// function getTimer(handle: number): Timer | undefined {
//   if (handle != null && map.has(handle)) {
//     return map.get(handle);
//   }
//   return;
// }
export class Timer {
    /** 預計倒數秒數 */
    seconds = 0;
    /** 倒數結束執行的callback */
    tickCallback;
    /** 倒數間隔(ms),預設為1000ms */
    tickInterval = 1000;
    /** 已執行過callback */
    hasExecCallback = false;
    /** 結束時間time */
    expireTime = 0;
    /** setInterval flag */
    handle;
    remainingTime = 0;
    /**
     * constructor
     *
     * @param seconds
     * @param tickCallback
     */
    constructor(seconds, tickCallback, tickInterval = 1000) {
        this.seconds = seconds;
        this.tickCallback = tickCallback;
        this.tickInterval = tickInterval;
        // 利用reset()初始化變數
        this.reset(false);
    }
    /**
     * 開始倒數
     *
     * @returns
     */
    start() {
        if (this.tickCallback != null) {
            // 暫停既有的計時,避免重覆執行start()有多個倒數
            clearCustomInterval(this.handle);
            // 每次start()觸發得重新計算expireTime
            this.refreshExpireTime();
            // 啟動interval
            let c = Math.round(this.remainingTime / 1000) + 1;
            this.handle = setCustomInterval(() => {
                // 持續刷新剩餘時間
                this.refreshRemainingTime();
                if (c <= 0) {
                    this.countdownEnd();
                }
                else {
                    --c;
                    if (c == 0) {
                        this.countdownEnd();
                    }
                    else {
                        this.tickCallback(c);
                    }
                }
            }, this.tickInterval);
        }
    }
    /**
     * 暫停倒數
     * <p>stop()後再start()會接續剩餘的秒數,若已執行過callback再start()也不會再執行</p>
     */
    stop() {
        if (this.handle != null) {
            clearCustomInterval(this.handle);
            this.handle = null;
        }
    }
    /**
     * 取消倒數
     * <p>cancel()後再start()會再從頭倒數秒數,若已執行過callback時間到會再執行</p>
     */
    cancel() {
        this.stop();
        this.reset(false);
    }
    /**
     * 重置
     * <p>reset()後會再從頭倒數秒數,若已執行過callback時間到會再執行</p>
     */
    reset(restart = true) {
        // 重置剩餘時間
        this.remainingTime = this.seconds * 1000;
        // 重置結束時間
        this.refreshExpireTime();
        this.hasExecCallback = false;
        if (restart)
            this.start();
    }
    /**
     * 更新 剩餘時間(ms)
     *
     * @returns
     */
    refreshRemainingTime() {
        this.remainingTime = this.expireTime - new Date().getTime();
    }
    /**
     * 更新 完成時間(ms)
     */
    refreshExpireTime() {
        // 加上耗損時間確保顯示正確
        this.expireTime = new Date().getTime() + this.remainingTime + 700;
    }
    /**
     * 倒數結束
     */
    countdownEnd() {
        this.stop();
        if (!this.hasExecCallback) {
            this.hasExecCallback = true;
            this.tickCallback(0);
        }
    }
}
