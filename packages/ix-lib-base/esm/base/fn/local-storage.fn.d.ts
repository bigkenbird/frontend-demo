/**
 * 取得 指定鍵值的值
 *
 * @param storageKey - local storage key
 */
export declare function getLocalStorageValue(storageKey: string): string;
/**
 * 設定 指定鍵值的值
 *
 * @param storageKey - local storage key
 * @param value - value
 */
export declare function setLocalStorageValue(storageKey: string, value: string | null): void;
/**
 * 取得Storage內指定suStorageKey的value
 *
 * @param storageKey - local storage key
 * @param key - 指定鍵值的JSON內的key
 */
export declare function getLocalStorageJSONValue(storageKey: string, key: string): string;
/**
 * 設定SubStorage的key/value
 *
 * @param storageKey - local storage key
 * @param key - 指定鍵值的JSON內的key
 * @param value - 指定鍵值的JSON內的value
 */
export declare function setLocalStorageJSONValue(storageKey: string, key: string, value: string | null): void;
