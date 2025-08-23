/**
 * 主題訂閱
 *
 * @param bufferSize 值大於0，會暫存觸發過的值，當後續有訂閱時觸發
 */
export function useSimpleSubject(bufferSize = 0) {
    /**
     * events
     */
    const eventSet = new Set();
    /**
     * buffer value
     */
    const bufferValueArray = [];
    /**
     * 訂閱
     * @param callback
     * @returns
     */
    function subscribe(event) {
        eventSet.add(event);
        // 把buffer Value都執行一次
        if (bufferSize > 0 && bufferValueArray.length > 0) {
            for (const val of bufferValueArray) {
                event(val);
            }
        }
        return {
            unsubscribe: () => {
                eventSet.delete(event);
            }
        };
    }
    /**
     * 發送事件
     * @param value
     */
    function emit(value) {
        eventSet.forEach((event) => {
            if (event)
                event(value);
        });
        // 控制bufferValue size
        if (bufferSize === 0) {
            // 不需buffer
        }
        else if (bufferSize > bufferValueArray.length) {
            bufferValueArray.push(value);
        }
        else {
            // remove first item
            bufferValueArray.shift();
            // push item
            bufferValueArray.push(value);
        }
    }
    /**
     * 是否有 訂閱事件
     */
    function hasEvent() {
        return eventSet.size > 0;
    }
    return {
        subscribe,
        emit,
        hasEvent
    };
}
/**
 * 空訂閱，用於訂閱失敗，可以回傳Subscription
 */
export function emptySubscription() {
    return {
        unsubscribe: () => {
            // do nothing
        }
    };
}
