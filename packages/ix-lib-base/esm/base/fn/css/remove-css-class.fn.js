import { replaceAll } from '../string/replace-all.fn';
import { isArray } from '../validator/is-array.fn';
import { isString } from '../validator/is-string.fn';
import { hasCSSClass } from './has-css-class.fn';
/**
 * element移除指定的Class
 */
export function removeCSSClass(element, clazz) {
    if (isString(clazz)) {
        remove(element, clazz);
    }
    else if (isArray(clazz)) {
        clazz.forEach((val) => {
            remove(element, val);
        });
    }
}
function remove(element, clazz) {
    // 舊版瀏覽器不一定支援classList或remove
    if (element.classList && element.classList.remove) {
        element.classList.remove(clazz);
    }
    else if (hasCSSClass(element, clazz)) {
        // clazz內帶有regex keyword需要escape
        clazz = clazz.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        element.className = replaceAll(' ' + element.className, ' ' + clazz.trim(), '').trim();
    }
}
