import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為error level
 *
 * @returns
 */
export function isMfpError() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.ERROR;
}
/**
 * mfp log error
 * used for unexpected exceptions
 *
 * @returns
 */
export function mfpError(log) {
    if (mfpLogger)
        mfpLogger.error(log);
}
