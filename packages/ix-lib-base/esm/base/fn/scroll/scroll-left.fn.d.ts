/**
 * 取得目前scrollLeft值
 *
 * @param scrollingElement 指定捲動元素
 * @returns scrollLeft值
 */
export declare function getScrollLeft(scrollingElement?: HTMLElement): number;
/**
 * 取得距離左端的位置
 * @param element
 * @returns
 */
export declare function getElementLeftPosition(element: HTMLElement): number;
/**
 * 左右捲動畫面
 *
 * @param to 前往位置
 * @param animate 是否平滑捲動
 * @param duration 指定平滑捲動到指定位置所需時間(ms)
 * @param element 指定捲動元素
 */
export declare function scrollLeftAnimate(to: number, animate?: boolean, duration?: number, scrollingElement?: HTMLElement): Promise<void>;
