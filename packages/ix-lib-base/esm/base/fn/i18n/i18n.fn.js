import { debug } from '../logger/debug.fn';
import { getLocale, Locale, setLocale } from '../settings/i18n-settings.fn';
import { isBlank } from '../validator/is-blank.fn';
import { getLocaleMessages } from './i18n-messages.fn';
/**
 * 初始語系
 */
export function initLocale(lang) {
    let locale = Locale['zh-TW'];
    let language;
    if (isBlank(lang)) {
        // 由navigator取得
        language = navigator.language;
    }
    else {
        language = lang;
    }
    if (language != null) {
        const values = language.split('-');
        if (values.length === 2) {
            // 目前只考慮中英兩種
            if (values[0] !== 'zh') {
                locale = Locale['en-US'];
            }
        }
    }
    setLocale(locale);
    debug('locale:', locale);
}
/**
 * 語系是否為zh-TW
 */
export function isZhTWLocale() {
    return getLocale() === Locale['zh-TW'];
}
/**
 * 語系是否為en-US
 */
export function isEnUSLocale() {
    return getLocale() == Locale['en-US'];
}
/**
 * 取得多國語系文字內容
 * 多語系文字內容定義在messages.ts
 * getBundleString('cmn01001-003.text', ['取代', '文字']), return '多語系文字'
 *
 * @param pk - 多語系鍵值
 * @param params - 多語系內容替代變數
 * @param locale - 直接指定語系
 */
export function getBundleString(pk, params, locale) {
    // 無PK
    if (isBlank(pk)) {
        return pk;
    }
    // 無指定locale
    if (isBlank(locale)) {
        locale = getLocale();
        // 仍無locale
        if (isBlank(locale)) {
            return pk;
        }
    }
    try {
        const localeMessages = getLocaleMessages()[locale];
        if (localeMessages == null)
            return pk;
        let txt = localeMessages[pk];
        if (txt == null) {
            return pk;
        }
        else {
            if (params != null) {
                const len = params.length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        txt = txt.replace(new RegExp('\\{' + i + '\\}', 'g'), params[i]);
                    }
                }
            }
        }
        return txt;
    }
    catch (e) {
        return pk;
    }
}
