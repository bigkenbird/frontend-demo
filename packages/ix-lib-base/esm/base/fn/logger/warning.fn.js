import { baseConfig } from '../../base-config';
import { isMfpWarn, mfpWarn } from '../mfp/warn.fn';
import { getLoggerLevel, getLoggerTraceId, isLoggerEnable } from '../settings/logger-settings.fn';
import { arrayToString } from '../string/safe-to-string.fn';
import { canUseColor, LoggerLevel } from './logger.fn';
/**
 * logger是否為warning level
 *
 * @returns
 */
export function isWarning() {
    return getLoggerLevel() <= LoggerLevel.WARNING;
}
/**
 * warning log
 *
 * @example
 * ```
 * warning(1) // print 1
 * warning(1, 2) // print 1 2
 * warning('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export function warning(...logs) {
    if (isLoggerEnable() && isWarning()) {
        if (canUseColor) {
            console.log('%c WARNING:  ', 'background:#ffc107;color:black', ...logs);
        }
        else {
            console.log('WARNING: ', ...logs);
        }
    }
    if (baseConfig.serverLogger && isMfpWarn()) {
        mfpWarn(`${getLoggerTraceId()} ${arrayToString(logs)}`);
    }
}
