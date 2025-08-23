import { isArray } from '../validator/is-array.fn';
import { isBlank } from '../validator/is-blank.fn';
import { isString } from '../validator/is-string.fn';
import { hasCSSClass } from './has-css-class.fn';
/**
 * element加上指定的CSS樣式
 *
 * @param element HTML元素
 * @param clazz CSS樣式名稱 或 CSS樣式名稱陣列
 */
export function addCSSClass(element, clazz) {
    // 一者為空,回傳false
    if (element == null || clazz == null)
        return;
    // 有支援classList add
    if (element.classList && element.classList.add) {
        // classList不能傳入空字串會報錯誤，要先判斷掉
        if (isString(clazz)) {
            if (!isBlank(clazz))
                element.classList.add(clazz);
        }
        else if (isArray(clazz)) {
            element.classList.add(...clazz.filter((item) => {
                return !isBlank(item);
            }));
        }
    }
    else {
        // 無支援classList
        if (isString(clazz)) {
            add(element, clazz);
        }
        else if (isArray(clazz)) {
            clazz.forEach((val) => {
                add(element, val);
            });
        }
    }
}
/**
 * element加上指定的CSS樣式，用於不支援classList時
 *
 * @param element HTML元素
 * @param clazz CSS樣式名稱
 */
function add(element, clazzName) {
    // 一者為空,回傳false
    if (element == null || isBlank(clazzName))
        return;
    // element無class
    if (isBlank(element.className)) {
        element.className = clazzName;
    }
    // 尚無此樣式
    else if (!hasCSSClass(element, clazzName)) {
        element.className += ' ' + clazzName;
    }
}
