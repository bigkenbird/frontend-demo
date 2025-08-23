import { fatal } from '../logger/fatal.fn';
import { isDevMode } from '../settings/dev-mode-settings.fn';
/**
 * 開發模式 fatal
 *
 * @param msg
 */
export function devFatal(...msg) {
    fatal(...msg);
    if (isDevMode()) {
        alert(`開發提醒：${msg[0]}`);
    }
}
