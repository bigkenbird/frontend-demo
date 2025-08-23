import { baseConfig } from '../../base-config';
import { isMfpDebug, mfpDebug } from '../mfp/debug.fn';
import { getLoggerLevel, getLoggerTraceId, isLoggerEnable } from '../settings/logger-settings.fn';
import { arrayToString } from '../string/safe-to-string.fn';
import { canUseColor, LoggerLevel } from './logger.fn';
/**
 * logger是否為debug level
 *
 * @returns
 */
export function isDebug() {
    return getLoggerLevel() <= LoggerLevel.DEBUG;
}
/**
 * debug log
 *
 * @example
 * ```
 * debug(1) // 1
 * debug(1, 2) // 1 2
 * debug('a', 'b', 'c') // "a" "b" "c"
 * ```
 * @param logs 可傳入多個參數
 */
export function debug(...logs) {
    if (isLoggerEnable() && isDebug()) {
        if (canUseColor) {
            console.log('%c DEBUG: ', 'background:blue;color:white', ...logs);
        }
        else {
            console.log('DEBUG: ', ...logs);
        }
    }
    if (baseConfig.serverLogger && isMfpDebug()) {
        mfpDebug(`${getLoggerTraceId()} ${arrayToString(logs)}`);
    }
}
