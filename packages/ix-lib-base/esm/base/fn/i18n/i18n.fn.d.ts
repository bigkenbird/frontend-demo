/**
 * 初始語系
 */
export declare function initLocale(lang?: string): void;
/**
 * 語系是否為zh-TW
 */
export declare function isZhTWLocale(): boolean;
/**
 * 語系是否為en-US
 */
export declare function isEnUSLocale(): boolean;
/**
 * 取得多國語系文字內容
 * 多語系文字內容定義在messages.ts
 * getBundleString('cmn01001-003.text', ['取代', '文字']), return '多語系文字'
 *
 * @param pk - 多語系鍵值
 * @param params - 多語系內容替代變數
 * @param locale - 直接指定語系
 */
export declare function getBundleString(pk: string, params?: string[], locale?: string): string;
