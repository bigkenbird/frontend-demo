import { getParentElement } from '../node/parent-element.fn';
import { isBlank } from '../validator/is-blank.fn';
import { hasCSSClass } from './has-css-class.fn';
/**
 * 找出指定CSS樣式名稱最近的父層元素
 *
 * @param element HTML元素
 * @param clazz CSS樣式名稱
 * @returns
 */
export function closestCSSClass(element, clazz) {
    if (element == null || isBlank(clazz))
        return null;
    while (element != null) {
        if (hasCSSClass(element, clazz)) {
            return element;
        }
        element = getParentElement(element);
    }
    return null;
}
