import { isIOS, isNativeApp } from '../env-info.fn';
import { subscribeEvent } from './subscribe-event.fn';
const isNative = isNativeApp();
const eventElement = isNative ? document : window;
const pauseEventName = isNative ? (isIOS() ? 'resign' : 'pause') : 'blur';
/**
 * 訂閱Pause事件
 */
export function subscribePauseEvent(callback) {
    return subscribeEvent(eventElement, pauseEventName, callback);
}
