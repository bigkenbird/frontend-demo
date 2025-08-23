import { useEventBus } from '@twix/ix-lib-base';
const eventBus = useEventBus();
const resume = 'window-resume-event';
export function subscribeGlobalResumeEvent(event) {
    return eventBus.on(resume, event);
}
export function emitGlobalResumeEvent(e) {
    eventBus.emit(resume, [e]);
}
const pause = 'window-pause-event';
export function subscribeGlobalPauseEvent(event) {
    return eventBus.on(pause, event);
}
export function emitGlobalPauseEvent(e) {
    eventBus.emit(pause, [e]);
}
const orientationchange = 'window-orientationchange-event';
export function subscribeGlobalOrientationChangeEvent(event) {
    return eventBus.on(orientationchange, event);
}
export function emitGlobalOrientationChangeEvent(e) {
    eventBus.emit(orientationchange, [e]);
}
const resize = 'window-resize-event';
export function subscribeGlobalResizeEvent(event) {
    return eventBus.on(resize, event);
}
export function emitGlobalResizeEvent(e) {
    eventBus.emit(resize, [e]);
}
const error = 'window-error-event';
export function subscribeGlobalErrorEvent(event) {
    return eventBus.on(error, event);
}
export function emitGlobalErrorEvent(err) {
    eventBus.emit(error, [err]);
}
const historyBack = 'global-history-back';
export function subscribeGlobalHistoryBack(event) {
    return eventBus.on(historyBack, event);
}
export function emitGlobalHistoryBack() {
    eventBus.emit(historyBack, []);
}
