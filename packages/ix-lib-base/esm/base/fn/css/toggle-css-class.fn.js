import { addCSSClass } from './add-css-class.fn';
import { hasCSSClass } from './has-css-class.fn';
import { removeCSSClass } from './remove-css-class.fn';
/**
 * toggle 樣式
 * @param element
 * @param clazz
 */
export function toggleCSSClass(element, clazz) {
    if (hasCSSClass(element, clazz)) {
        removeCSSClass(element, clazz);
    }
    else {
        addCSSClass(element, clazz);
    }
}
