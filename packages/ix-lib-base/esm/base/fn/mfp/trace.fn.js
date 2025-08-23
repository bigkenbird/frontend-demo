import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為trace level
 *
 * @returns
 */
export function isMfpTrace() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.TRACE;
}
/**
 * mfp log trace
 * used for method entry and exit points
 *
 * @returns
 */
export function mfpTrace(log) {
    if (mfpLogger)
        mfpLogger.trace(log);
}
