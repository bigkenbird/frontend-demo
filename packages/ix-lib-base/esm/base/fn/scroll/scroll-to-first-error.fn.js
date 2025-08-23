import { isHiddenElement } from '../node/is-hidden-element.fn';
import { isBlank } from '../validator/is-blank.fn';
import { getElementTopPosition, scrollAnimate } from './scroll.fn';
/**
 * 捲動到首個錯誤位置
 */
export function scrollToFirstError(selector, rootElement, scrollableElement) {
    if (isBlank(selector) || rootElement == null)
        return;
    // 延遲
    setTimeout(() => {
        // 搜尋錯誤元素
        const elements = rootElement.querySelectorAll(selector);
        const len = elements.length;
        if (len == 0)
            return;
        for (let i = 0; i < len; i++) {
            // 檢查錯誤的element有顯示在畫面上
            if (!isHiddenElement(elements.item(i))) {
                // 決定捲動位置
                const position = getElementTopPosition(elements.item(i)) - 100;
                scrollAnimate(position > 0 ? position : 0, true, undefined, scrollableElement);
                break;
            }
        }
    }, 30);
}
