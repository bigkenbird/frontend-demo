import { isNativeApp } from '../env-info.fn';
import { isBlank } from '../validator/is-blank.fn';
import { devWarning } from './dev-logger-warning.fn';
/**
 * 檢查<img> src屬性是否不符
 *
 * @param element
 */
export function devImageSrcWarning(element) {
    // 要由getAttribute取得src不是用element.src
    const src = element.getAttribute('src');
    if (isBlank(src)) {
        devWarning('image src為空:' + element.outerHTML);
    }
    else if (src.startsWith('..') || (isNativeApp() && src.startsWith('/'))) {
        devWarning('image src開頭需補上URL_ROOT：' + src);
    }
}
