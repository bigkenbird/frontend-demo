import { preventDefault, stopPropagation } from '../../event/click-prevent.fn';
/**
 * 密碼欄位 防止 貼上,複製,剪下
 *
 * @param element 開始執行的根元素
 * @param ignoreType 不限type=password
 */
export function blockPxdPasteCopyCut(target, ignorePxdType = false) {
    if (target == null)
        return;
    if (target.tagName === 'INPUT' && (ignorePxdType || target.getAttribute('type') === 'password')) {
        handleEvent(target);
        return;
    }
    const selector = 'input' + (ignorePxdType ? '' : '[type="password"]');
    const inputs = target.querySelectorAll(selector);
    const len = inputs.length;
    if (len > 0) {
        for (let i = 0; i < inputs.length; i++) {
            handleEvent(inputs.item(i));
        }
    }
}
function handleEvent(element) {
    element.addEventListener('paste', block);
    element.addEventListener('copy', block);
    element.addEventListener('cut', block);
}
function block(e) {
    stopPropagation(e);
    preventDefault(e);
    return false;
}
