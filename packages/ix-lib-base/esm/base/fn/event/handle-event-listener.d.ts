/**
 * 封裝原生的addEventListener
 *
 * @param once options.once可能舊版瀏覽器不支援,新增once參數自己控制
 *
 * @returns 回傳移除的function
 */
export declare function handleEventListener<E>(
    target: HTMLElement | Document | Window,
    name: string,
    listener: (event: E) => void,
    options?: boolean | AddEventListenerOptions,
    once?: boolean
): () => void;
