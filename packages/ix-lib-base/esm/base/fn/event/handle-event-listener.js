/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 封裝原生的addEventListener
 *
 * @param once options.once可能舊版瀏覽器不支援,新增once參數自己控制
 *
 * @returns 回傳移除的function
 */
export function handleEventListener(target, name, listener, options, once = false) {
    let evtListener = listener;
    if (once) {
        evtListener = (event) => {
            listener(event);
            removeListener();
        };
    }
    const removeListener = () => {
        target.removeEventListener(name, evtListener);
    };
    target.addEventListener(name, evtListener, options);
    return once ? () => {} : removeListener;
}
