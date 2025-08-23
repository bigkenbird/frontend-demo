/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultString } from './string/default-string.fn';
import { isBlank } from './validator/is-blank.fn';
/**
 * Event Bus
 */
export function useEventBus() {
    /**
     * 存放事件用
     */
    const map = new Map();
    /**
     * 取得事件PK
     *
     * @param name
     * @param nameExt
     * @returns
     */
    function getPK(name, nameExt) {
        // 分隔，主要防止名稱容易重覆
        return name + '｜' + defaultString(nameExt);
    }
    /**
     * 啟用事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param nameExt 擴展事件名稱
     */
    function on(name, event, nameExt = '') {
        const pk = getPK(name, nameExt);
        if (!map.has(pk)) {
            map.set(pk, new Set());
        }
        // 若set內已存在相同event參照,Set.add()會自己過濾,不會多一筆
        map.get(pk).add(event);
        return () => {
            off(name, event, nameExt);
        };
    }
    /**
     * 取消事件
     *
     * @param name 事件名稱
     * @param event 事件
     * @param nameExt 擴展事件名稱
     */
    function off(name, event, nameExt = '') {
        const pk = getPK(name, nameExt);
        if (event) {
            const set = map.get(pk);
            if (set)
                set.delete(event);
        }
        else {
            if (isBlank(nameExt)) {
                // 未指定event與nameExt，移除name與nameExt所有event
                for (const key of map.keys()) {
                    if (key.startsWith(pk))
                        map.delete(key);
                }
            }
            else {
                // 未指定event，移除name所有event
                map.delete(pk);
            }
        }
    }
    /**
     * 觸發事件
     *
     * @param name 事件名稱
     * @param data 事件參數
     * @param nameExt 擴展事件名稱
     * @param emitExt 事件名稱+擴展事件名稱，前綴相符就發送事件
     */
    function emit(name, data, nameExt = '', emitExt = false) {
        // name要不為空才能用matchPrefix，否則應完整
        if (!isBlank(name)) {
            const pk = getPK(name, nameExt);
            if (emitExt) {
                // 找出完全同名與前綴符合的
                for (const key of map.keys()) {
                    if (key.startsWith(pk)) {
                        map.get(key).forEach((event) => {
                            event(...data);
                        });
                    }
                }
            }
            else {
                // 只找出完全同名
                if (map.has(pk)) {
                    map.get(pk).forEach((event) => {
                        event(...data);
                    });
                }
            }
        }
    }
    return {
        on,
        off,
        emit
    };
}
