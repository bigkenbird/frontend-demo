import { isBlank } from '../validator/is-blank.fn';
/**
 * element是否有指定的Class
 */
export function hasCSSClass(element, clazz) {
    // 一者為空,回傳false
    if (element == null || isBlank(clazz)) {
        return false;
    }
    // 舊版瀏覽器不一定支援classList或contains
    if (element.classList && element.classList.contains) {
        return element.classList.contains(clazz);
    }
    else {
        const names = element.className.split(/\s+/);
        const len = names.length;
        for (let i = 0; i < len; i++) {
            if (names[i] === clazz.trim()) {
                return true;
            }
        }
        return false;
    }
}
