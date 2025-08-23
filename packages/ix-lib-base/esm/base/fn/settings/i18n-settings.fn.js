/**
 * 語系常數
 */
export var Locale;
(function (Locale) {
    Locale['zh-TW'] = 'zh-TW';
    Locale['en-US'] = 'en-US';
})(Locale || (Locale = {}));
/** 語系, default:'zh-TW' */
let _locale = Locale['zh-TW'];
/**
 * 取得 目前語系
 *
 * @returns
 */
export function getLocale() {
    return _locale;
}
/**
 * 設定 目前語系
 *
 * @param locale 設定的語系
 */
export function setLocale(locale) {
    _locale = locale;
}
