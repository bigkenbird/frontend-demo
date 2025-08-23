import { isBlank } from '../validator/is-blank.fn';
import { handleEventListener } from './handle-event-listener';
import { emptySubscription, useSimpleSubject } from './simple-subject';
// WeakMap
const subscribeEventMap = new WeakMap();
/**
 * 訂閱事件
 * @param target
 * @param eventName
 * @param callback
 * @returns
 */
export function subscribeEvent(target, eventName, callback) {
    // return empty subscription
    if (target == null || isBlank(eventName) || callback == null)
        return emptySubscription();
    let subscribeEvent = subscribeEventMap.get(target);
    // event name 已存在 subject
    if (subscribeEvent && subscribeEvent.name === eventName) {
        return subscribeEvent.subject.subscribe(callback);
    }
    else {
        // new subject
        const subject = useSimpleSubject();
        // add listener
        const removeListener = handleEventListener(target, eventName, (e) => {
            subject.emit(e);
        });
        subscribeEvent = {
            name: eventName,
            subject
        };
        subscribeEventMap.set(target, subscribeEvent);
        const subscription = subject.subscribe(callback);
        return {
            unsubscribe: () => {
                // 移除已訂閱事件
                subscription.unsubscribe();
                // 已無訂閱的事件
                if (!subject.hasEvent()) {
                    // remove listener
                    removeListener();
                    // delete map entity
                    subscribeEventMap.delete(target);
                }
            }
        };
    }
}
