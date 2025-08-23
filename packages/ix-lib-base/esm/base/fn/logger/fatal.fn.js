import { baseConfig } from '../../base-config';
import { isMfpFatal, mfpFatal } from '../mfp/fatal.fn';
import { getLoggerLevel, getLoggerTraceId, isLoggerEnable } from '../settings/logger-settings.fn';
import { arrayToString } from '../string/safe-to-string.fn';
import { canUseColor, LoggerLevel } from './logger.fn';
/**
 * logger是否為fatal level
 *
 * @returns
 */
export function isFatal() {
    return getLoggerLevel() <= LoggerLevel.FATAL;
}
/**
 * fatal log
 *
 * @example
 * ```
 * fatal(1) // print 1
 * fatal(1, 2) // print 1 2
 * fatal('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export function fatal(...logs) {
    if (isLoggerEnable() && isFatal()) {
        if (canUseColor) {
            console.log('%c FATAL: ', 'background:red;color:black', ...logs);
        }
        else {
            console.log('FATAL: ', ...logs);
        }
    }
    if (baseConfig.serverLogger && isMfpFatal()) {
        mfpFatal(`${getLoggerTraceId()} ${arrayToString(logs)}`);
    }
}
