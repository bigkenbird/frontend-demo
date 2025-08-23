/**
 * 密碼欄位加上autocomplete=off，避免原生控制項出現
 *
 * 針對 password 欄位，設定 readonly 並於 click 時解除, 避免自動填入
 * 此方法目前僅適用於 Android Browser , ios 會鎖住鍵盤
 *
 * @param target - 指定的DOM
 * @param ignoreType 不限type=password
 */
export declare function blockPxdAutoComplete(target: HTMLElement, ignorePxdType?: boolean): void;
