/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 處理大寫鎖定
 *
 * @param target 指定的DOM
 * @param callback 鍵盤輸入會觸發，注意：是每個輸入都會觸發，要小心效能
 * @returns
 */
export function handleCapsLock(target, callback) {
    if (target == null || target.handleCapsLock)
        return;
    target.addEventListener('keydown', (e) => {
        callback(getCapsLockState(e));
    });
    // 有綁定過就不得再綁定
    target.handleCapsLock = true;
}
/**
 * get CapsLock State
 */
function getCapsLockState(e) {
    return e.getModifierState && e.getModifierState('CapsLock');
}
