import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為log level
 *
 * @returns
 */
export function isMfpLog() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.LOG;
}
/**
 * mfp log log
 * used for class instantiation
 *
 * @returns
 */
export function mfpLog(log) {
    if (mfpLogger)
        mfpLogger.log(log);
}
