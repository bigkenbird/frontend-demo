import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為info level
 *
 * @returns
 */
export function isMfpInfo() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.INFO;
}
/**
 * mfp log info
 * used for reporting initialization
 *
 * @returns
 */
export function mfpInfo(log) {
    if (mfpLogger)
        mfpLogger.info(log);
}
