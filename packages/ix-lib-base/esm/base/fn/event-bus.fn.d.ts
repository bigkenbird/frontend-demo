/**
 * Event Bus
 */
export declare class EventBus {
    /**
     * 存放事件用
     */
    private map;
    /**
     * 存放一次性的事件用
     */
    private onceMap;
    /**
     * 分隔，主要防止名稱容易重覆
     */
    private TOKEN;
    /**
     * 啟用事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param key 指定鍵值
     */
    on(name: string, event: (...args: any[]) => Promise<any>, key?: string): void;
    /**
     * 啟用一次性事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param key 指定鍵值
     */
    once(name: string, event: (...args: any[]) => Promise<any>, key?: string): void;
    /**
     * 取消事件
     *
     * @param name 事件名稱
     * @param key 指定鍵值
     */
    off(name: string, key?: string): void;
    /**
     * 觸發事件
     *
     * @param name 事件名稱
     * @param data 事件參數
     * @param key 指定鍵值
     * @param matchPrefix 註冊的事件名稱開頭符合指定鍵值，也發送事件
     */
    emit(name: string, data: any[], key?: string, matchPrefix?: boolean): Promise<any[]>;
    /**
     * 是否已存在事件名稱
     * @param pk 事件名稱
     */
    has(pk: string): boolean;
    /**
     * 若查無事件，產生空事件
     */
    private defaultEvent;
}
