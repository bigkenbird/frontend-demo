import { debug as _debug, isDebug } from './logger/debug.fn';
/**
 * Storage值，減少IO，若不需要可再調整
 */
const storageWrapper = {};
/**
 * 取得 指定鍵值的值
 *
 * @param storageKey - local storage key
 */
export function getLocalStorageValue(storageKey) {
    debug('getLocalStorageValue()', 'storageKey:', storageKey);
    if (storageWrapper[storageKey] != null)
        return storageWrapper[storageKey];
    storageWrapper[storageKey] = window.localStorage.getItem(storageKey);
    return storageWrapper[storageKey];
}
/**
 * 設定 指定鍵值的值
 *
 * @param storageKey - local storage key
 * @param value - value
 */
export function setLocalStorageValue(storageKey, value) {
    debug('setLocalStorageValue()', 'storageKey:', storageKey, 'val:', value);
    delete storageWrapper[storageKey];
    if (value == null) {
        // 值為null或undefined視為清除
        window.localStorage.removeItem(storageKey);
    }
    else {
        window.localStorage.setItem(storageKey, value);
    }
}
/**
 * 取得 指定鍵值的JSON
 * <p>為避免鍵值發散，可以統一集中在一個鍵值下，非絕對要使用</p>
 *
 * @param storageKey - local storage key
 */
function getJSON(storageKey) {
    debug('getStorageJSON()', 'storageKey:', storageKey);
    if (storageWrapper[storageKey] != null)
        return storageWrapper[storageKey];
    let storageJSON = window.localStorage.getItem(storageKey);
    if (storageJSON == null) {
        setJSON(storageKey, {});
        storageJSON = window.localStorage.getItem(storageKey);
    }
    storageWrapper[storageKey] = JSON.parse(storageJSON);
    return storageWrapper[storageKey];
}
/**
 * 設定Storage的JSON
 * <p>為避免鍵值發散，可以統一集中在一個鍵值下，非絕對要使用</p>
 *
 * @param storageKey - local storage key
 * @param storageJSON - storage JSON
 */
function setJSON(storageKey, storageJSON) {
    debug('setStorageJSON()', 'storageKey:', storageKey, 'storageJSON:', storageJSON);
    delete storageWrapper[storageKey];
    if (storageJSON == null) {
        // 值為null或undefined視為清除
        window.localStorage.removeItem(storageKey);
    }
    else {
        window.localStorage.setItem(storageKey, JSON.stringify(storageJSON));
    }
}
/**
 * 取得Storage內指定suStorageKey的value
 *
 * @param storageKey - local storage key
 * @param key - 指定鍵值的JSON內的key
 */
export function getLocalStorageJSONValue(storageKey, key) {
    debug('getStorageJSONValue()', 'storageKey:', storageKey, 'key:', key);
    return getJSON(storageKey)[key];
}
/**
 * 設定SubStorage的key/value
 *
 * @param storageKey - local storage key
 * @param key - 指定鍵值的JSON內的key
 * @param value - 指定鍵值的JSON內的value
 */
export function setLocalStorageJSONValue(storageKey, key, value) {
    debug('setStorageJSONValue()', 'storageKey:', storageKey, 'key:', key, 'value:', value);
    if (storageKey == null || key == null)
        return;
    const storageJSON = getJSON(storageKey);
    if (value == null) {
        // 未帶value表示清除此鍵值
        delete storageJSON[key];
    }
    else {
        storageJSON[key] = value;
    }
    setJSON(storageKey, storageJSON);
}
function debug(...logs) {
    if (isDebug())
        _debug('[ localStorage ]', ...logs);
}
