/**
 * Event Bus
 */
export declare function useEventBus(): {
    /**
     * 啟用事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param nameExt 擴展事件名稱
     */
    on: (name: string, event: (...args: any[]) => void, nameExt?: string) => () => void;
    /**
     * 取消事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param nameExt 擴展事件名稱
     */
    off: (name: string, event?: (...args: unknown[]) => void, nameExt?: string) => void;
    /**
     * 觸發事件
     *
     * @param name 事件名稱
     * @param data 事件參數
     * @param nameExt 擴展事件名稱
     * @param emitExt 事件名稱+擴展事件名稱，前綴相符就發送事件
     */
    emit: (name: string, data: any[], nameExt?: string, emitExt?: boolean) => void;
};
