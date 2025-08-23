import { getParentElement } from '../node/parent-element.fn';
/**
 * 取得元素到頂端的距離
 *
 * 與頂端的距離非捲動的位置，捲動位置可使用getScrollTop()
 *
 * @param element 元素
 * @returns
 */
export function distanceToTop(element) {
    let dist = 0;
    // 要用parentElement，不是parentNode
    while ((element = getParentElement(element))) {
        dist += element.offsetTop;
    }
    return dist;
}
