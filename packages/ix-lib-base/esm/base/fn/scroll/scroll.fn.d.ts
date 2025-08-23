/**
 * 取得目前scrollTop值
 *
 * @param scrollingElement 指定捲動元素
 * @returns scrollTop值
 */
export declare function getScrollTop(scrollingElement?: HTMLElement): number;
/**
 * 取得預設的捲動元素
 *
 * @returns
 */
export declare function getDefaultScrollingElement(): HTMLElement;
/**
 * 取得距離頂端的位置
 * @param element
 * @returns
 */
export declare function getElementTopPosition(element: HTMLElement): number;
/**
 * 捲動畫面
 *
 * @param to 前往位置
 * @param animate 是否平滑捲動
 * @param duration 指定平滑捲動到指定位置所需時間(ms)
 * @param element 指定捲動元素
 */
export declare function scrollAnimate(to: number, animate?: boolean, duration?: number, scrollingElement?: HTMLElement): Promise<void>;
