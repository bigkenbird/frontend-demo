import { ISimpleSubscription } from './simple-subject';
/**
 * 訂閱事件
 * @param target
 * @param eventName
 * @param callback
 * @returns
 */
export declare function subscribeEvent<T>(target: HTMLElement | Document | Window, eventName: string, callback: (e: T) => void): ISimpleSubscription;
