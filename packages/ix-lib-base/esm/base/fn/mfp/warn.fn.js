import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為warning level
 *
 * @returns
 */
export function isMfpWarn() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.WARN;
}
/**
 * mfp log warn
 * used to log deprecated usage warnings
 *
 * @returns
 */
export function mfpWarn(log) {
    if (mfpLogger)
        mfpLogger.warn(log);
}
