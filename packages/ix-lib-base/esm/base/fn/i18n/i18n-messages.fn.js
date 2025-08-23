import { devWarning } from '../dev/dev-logger-warning.fn';
import { isBlank } from '../validator/is-blank.fn';
let _messages = {};
export function getLocaleMessages() {
    return _messages;
}
/**
 * 設定 多語系內容
 *
 * @param messages
 */
export function setLocaleMessages(messages) {
    _messages = messages;
}
/**
 * 取代 多語系內容
 *
 * @param messages
 */
export function addLocaleMessages(messages) {
    for (const locale in messages) {
        if (_messages[locale] != null) {
            const baseLocaleMsg = _messages[locale];
            for (const msg in messages[locale]) {
                if (!isBlank(baseLocaleMsg[msg])) {
                    devWarning('新增的多語系內容有重覆鍵值(' + locale + ' ' + msg + ')');
                }
                baseLocaleMsg[msg] = messages[locale][msg];
            }
        }
        else {
            _messages[locale] = messages[locale];
        }
    }
}
