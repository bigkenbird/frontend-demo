/**
 * 檢查HTML元素是否沒有顯示在畫面上
 *
 * @example
 * ```
 * isHiddenElement(null) // false, 當傳入null，目前回false
 * isHiddenElement(document.body) // true
 * ```
 * @param element
 * @returns true:隱藏 false:未隱藏
 */
export function isHiddenElement(element) {
    return element != null && element.offsetParent == null;
}
