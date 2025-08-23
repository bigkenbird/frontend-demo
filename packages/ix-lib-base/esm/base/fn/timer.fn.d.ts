export declare class Timer {
    /** 預計倒數秒數 */
    private seconds;
    /** 倒數結束執行的callback */
    private tickCallback;
    /** 倒數間隔(ms),預設為1000ms */
    private tickInterval;
    /** 已執行過callback */
    private hasExecCallback;
    /** 結束時間time */
    private expireTime;
    /** setInterval flag */
    private handle;
    private remainingTime;
    /**
     * constructor
     *
     * @param seconds
     * @param tickCallback
     */
    constructor(seconds: number, tickCallback: (countdownSec: number) => void, tickInterval?: number);
    /**
     * 開始倒數
     *
     * @returns
     */
    start(): void;
    /**
     * 暫停倒數
     * <p>stop()後再start()會接續剩餘的秒數,若已執行過callback再start()也不會再執行</p>
     */
    stop(): void;
    /**
     * 取消倒數
     * <p>cancel()後再start()會再從頭倒數秒數,若已執行過callback時間到會再執行</p>
     */
    cancel(): void;
    /**
     * 重置
     * <p>reset()後會再從頭倒數秒數,若已執行過callback時間到會再執行</p>
     */
    reset(restart?: boolean): void;
    /**
     * 更新 剩餘時間(ms)
     *
     * @returns
     */
    private refreshRemainingTime;
    /**
     * 更新 完成時間(ms)
     */
    private refreshExpireTime;
    /**
     * 倒數結束
     */
    private countdownEnd;
}
