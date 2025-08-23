/**
 * 語系常數
 */
export declare enum Locale {
    'zh-TW' = 'zh-TW',
    'en-US' = 'en-US',
}
/**
 * 取得 目前語系
 *
 * @returns
 */
export declare function getLocale(): Locale;
/**
 * 設定 目前語系
 *
 * @param locale 設定的語系
 */
export declare function setLocale(locale: Locale): void;
