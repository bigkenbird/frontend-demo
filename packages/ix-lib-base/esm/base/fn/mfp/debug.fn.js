import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為debug level
 *
 * @returns
 */
export function isMfpDebug() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.DEBUG;
}
/**
 * mfp log debug
 * used for method result output
 *
 * @returns
 */
export function mfpDebug(log) {
    if (mfpLogger)
        mfpLogger.debug(log);
}
