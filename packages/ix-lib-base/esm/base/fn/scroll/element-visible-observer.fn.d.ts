import { IData } from '../../base-interface';
/**
 * 初始觀察者
 *
 * @param callback
 */
export declare function initElementVisibleObserver(callback: (entry: IntersectionObserverEntry) => void, options?: IData): void;
/**
 * 中止觀察者
 */
export declare function disconnectElementVisibleObserver(): void;
/**
 * 加入element觀察
 * @param element
 */
export declare function observeElementVisible(element: HTMLElement): void;
/**
 * 取消element觀察
 *
 * @param element
 */
export declare function unobserveElementVisible(element: Element): void;
