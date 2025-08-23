import { warning } from '../logger/warning.fn';
import { isDevMode } from '../settings/dev-mode-settings.fn';
/**
 * 開發模式 warning
 *
 * @param msg
 */
export function devWarning(...msg) {
    warning(...msg);
    if (isDevMode()) {
        alert(`開發提醒：${msg[0]}`);
    }
}
