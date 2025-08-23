import { isIOS, isNativeApp } from '../env-info.fn';
import { subscribeEvent } from './subscribe-event.fn';
const isNative = isNativeApp();
const eventElement = isNative ? document : window;
const resumeEventName = isNative ? (isIOS() ? 'active' : 'resume') : 'focus';
/**
 * 訂閱Pause事件
 */
export function subscribeResumeEvent(callback) {
    return subscribeEvent(eventElement, resumeEventName, callback);
}
