/* eslint-disable @typescript-eslint/no-explicit-any */
import { devWarning } from './dev/dev-logger-warning.fn';
import { simpleAwait } from './simple-await.fn';
import { defaultString } from './string/default-string.fn';
import { isBlank } from './validator/is-blank.fn';
/**
 * Event Bus
 */
export class EventBus {
    /**
     * 存放事件用
     */
    map = new Map();
    /**
     * 存放一次性的事件用
     */
    onceMap = new Map();
    /**
     * 分隔，主要防止名稱容易重覆
     */
    TOKEN = '｜';
    /**
     * 啟用事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param key 指定鍵值
     */
    on(name, event, key = '') {
        const pk = name + this.TOKEN + defaultString(key);
        // 重覆註冊 發出警告
        if (this.has(pk))
            return;
        this.map.set(pk, event);
    }
    /**
     * 啟用一次性事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param key 指定鍵值
     */
    once(name, event, key = '') {
        const pk = name + this.TOKEN + defaultString(key);
        // 重覆註冊 發出警告
        if (this.has(pk))
            return;
        this.onceMap.set(pk, event);
    }
    /**
     * 取消事件
     *
     * @param name 事件名稱
     * @param key 指定鍵值
     */
    off(name, key = '') {
        const pk = name + this.TOKEN + defaultString(key);
        this.map.delete(pk);
        this.onceMap.delete(pk);
        // 若未指定key，則同名的全移除
        // this.map.forEach((val, key) => {
        //   if (key.startsWith(pk)) this.map.delete(pk);
        // });
        // this.onceMap.forEach((val, key) => {
        //   if (key.startsWith(pk)) this.onceMap.delete(pk);
        // });
    }
    /**
     * 觸發事件
     *
     * @param name 事件名稱
     * @param data 事件參數
     * @param key 指定鍵值
     * @param matchPrefix 註冊的事件名稱開頭符合指定鍵值，也發送事件
     */
    emit(name, data, key = '', matchPrefix = false) {
        const pk = name + this.TOKEN + defaultString(key);
        let event;
        // key要不為空才能用matchPrefix，否則應完整match
        if (!isBlank(key) && matchPrefix) {
            // 找出完全同名與前綴符合的
            this.map.forEach((val, key1) => {
                if (key1 === pk) {
                    event = val;
                }
                else if (key1.startsWith(pk)) {
                    simpleAwait(this.defaultEvent(val, key1, false)(...data));
                }
            });
            this.onceMap.forEach((val, key1) => {
                if (key1 === pk) {
                    event = val;
                    // 一次性觸發過就移除
                    this.onceMap.delete(key1);
                }
                else if (key1.startsWith(pk)) {
                    simpleAwait(this.defaultEvent(val, key1, false)(...data));
                    // 一次性觸發過就移除
                    this.onceMap.delete(key1);
                }
            });
        }
        else {
            matchPrefix = false;
            if (this.map.has(pk)) {
                event = this.map.get(pk);
            }
            else if (this.onceMap.has(pk)) {
                event = this.onceMap.get(pk);
                // 一次性觸發過就移除
                this.onceMap.delete(pk);
            }
        }
        // 防呆，無事件行為
        return simpleAwait(this.defaultEvent(event, pk, matchPrefix)(...data));
    }
    /**
     * 是否已存在事件名稱
     * @param pk 事件名稱
     */
    has(pk) {
        // 重覆註冊 發出警告
        if (this.map.has(pk)) {
            devWarning(`EventBus內已有同名事件:${pk}，不將進行覆寫`);
            return true;
        }
        else if (this.onceMap.has(pk)) {
            devWarning(`EventBus內已有同名一次性事件:${pk}，不將進行覆寫`);
            return true;
        }
        return false;
    }
    /**
     * 若查無事件，產生空事件
     */
    defaultEvent(event, pk, matchPrefix) {
        if (event == null) {
            if (!matchPrefix)
                devWarning(`EventBus內無此事件:${pk}`);
            event = () => {
                return Promise.resolve();
            };
        }
        return event;
    }
}
