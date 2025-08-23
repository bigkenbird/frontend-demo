import { getOSVersionMajor, isAndroid } from '../../env-info.fn';
/**
 * 密碼欄位加上autocomplete=off，避免原生控制項出現
 *
 * 針對 password 欄位，設定 readonly 並於 click 時解除, 避免自動填入
 * 此方法目前僅適用於 Android Browser , ios 會鎖住鍵盤
 *
 * @param target - 指定的DOM
 * @param ignoreType 不限type=password
 */
export function blockPxdAutoComplete(target, ignorePxdType = false) {
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
        for (let i = 0; i < len; i++) {
            handleEvent(inputs.item(i));
        }
    }
}
function handleEvent(element) {
    // 已存在不需要覆寫
    if (element.hasAttribute('autocomplete'))
        return;
    // off
    element.setAttribute('autocomplete', 'off');
    // 較舊版的Android即使設定autocomplete=off，依舊會有系統的控制項
    if (isAndroid() && getOSVersionMajor() < 8) {
        // 設定readonly，input會多一個readonly屬性
        element.readOnly = true;
        const event = () => {
            if (element.readOnly) {
                // 會一併清除input readonly屬性
                element.readOnly = false;
                element.removeEventListener('click', event, true);
            }
        };
        // 點擊後清除
        element.addEventListener('click', event, true);
    }
}
