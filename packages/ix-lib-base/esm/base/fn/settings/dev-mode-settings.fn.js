/** 開發模式 */
let _dev = false;
/**
 * 設定 是否為開發模式
 *
 * @param enable
 */
export function setDevMode(dev) {
    _dev = dev;
}
/**
 * 是否 為開發模式
 *
 * @returns
 */
export function isDevMode() {
    return _dev;
}
