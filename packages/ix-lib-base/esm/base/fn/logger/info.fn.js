import { baseConfig } from '../../base-config';
import { isMfpInfo, mfpInfo } from '../mfp/info.fn';
import { getLoggerLevel, getLoggerTraceId, isLoggerEnable } from '../settings/logger-settings.fn';
import { arrayToString } from '../string/safe-to-string.fn';
import { canUseColor, LoggerLevel } from './logger.fn';
/**
 * logger是否為info level
 *
 * @returns
 */
export function isInfo() {
    return getLoggerLevel() <= LoggerLevel.INFO;
}
/**
 * info log
 *
 * @example
 * ```
 * info(1) // print 1
 * info(1, 2) // print 1 2
 * info('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export function info(...logs) {
    if (isLoggerEnable() && isInfo()) {
        if (canUseColor) {
            console.log('%c INFO:  ', 'background:green;color:white', ...logs);
        }
        else {
            console.log('INFO: ', ...logs);
        }
    }
    if (baseConfig.serverLogger && isMfpInfo()) {
        mfpInfo(`${getLoggerTraceId()} ${arrayToString(logs)}`);
    }
}
