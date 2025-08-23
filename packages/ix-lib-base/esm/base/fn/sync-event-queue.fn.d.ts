export declare class SyncEventQueue {
    private lock;
    private queue;
    private argsQueue;
    private _finishAll;
    /**
     * 是否Queue還有未執行完成的Event
     * @returns
     */
    hasEventOnQueue(): boolean;
    pushQueue(event: (...args: any[]) => Promise<void>, args?: any[]): void;
    private runSync;
    finishAll(finishAll: () => void): void;
}
