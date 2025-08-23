import { baseConfig } from '../../base-config';
import { isMfpError, mfpError } from '../mfp/error.fn';
import { getLoggerLevel, getLoggerTraceId, isLoggerEnable } from '../settings/logger-settings.fn';
import { arrayToString } from '../string/safe-to-string.fn';
import { canUseColor, LoggerLevel } from './logger.fn';
/**
 * logger是否為error level
 *
 * @returns
 */
export function isError() {
    return getLoggerLevel() <= LoggerLevel.ERROR;
}
/**
 * error log
 *
 * @example
 * ```
 * error(1) // print 1
 * error(1, 2) // print 1 2
 * error('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export function error(...logs) {
    if (isLoggerEnable() && isError()) {
        if (canUseColor) {
            console.log('%c ERROR: ', 'background:red;color:white', ...logs);
        }
        else {
            console.log('ERROR: ', ...logs);
        }
    }
    if (baseConfig.serverLogger && isMfpError()) {
        mfpError(`${getLoggerTraceId()} ${arrayToString(logs)}`);
    }
}
