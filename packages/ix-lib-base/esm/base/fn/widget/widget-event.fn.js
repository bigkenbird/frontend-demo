import { debug } from '../../fn/logger/debug.fn';
// TOOD:先做出機制，後續再調整
const map = new Map();
const map2 = new Map();
export function emitWidgetEvent(id, event, data) {
    debug('fn.emitWidgetEvent() id:', id, 'event:', event, 'data:', data);
    const key = event + id;
    if (map.has(key)) {
        const x = map.get(key);
        x.callback(data);
    }
}
export function addWidgetEventListener(id, event, callback) {
    debug('fn.addWidgetEventListener() id:', id, 'event:', event);
    const key = event + id;
    if (map.has(key))
        map.delete(key);
    map.set(key, {
        event: event,
        callback: callback
    });
    if (map2.has(id)) {
        const y = map2.get(id);
        if (y != null)
            y.push(event);
    }
    else {
        map2.set(id, [event]);
    }
}
export function removeWidgetEventListener(id, event) {
    debug('fn.removeWidgetEventListener() id:', id, 'event:', event);
    const key = event + id;
    if (map.has(key))
        map.delete(key);
}
export function removeWidgetAllEventListener(id) {
    debug('fn.removeWidgetAllEventListener() id:', id);
    const y = map2.get(id);
    if (y != null) {
        y.forEach((event) => {
            map.delete(event + id);
        });
    }
    map2.delete(id);
}
export function widgetInit(element, initConfig, callback) {
    element.hasInitEvent = true;
    element.addEventListener('_init', (e) => {
        const info = e.detail;
        emitWidgetEvent(info.id, '_initConfig', initConfig);
        if (callback != null)
            callback(info);
    });
}
