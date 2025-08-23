import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { mfpLogger } from './mfp-logger.fn';
/**
 * logger是否為fatal level
 *
 * @returns
 */
export function isMfpFatal() {
    return getMfpLoggerLevel() <= MfpLoggerLevel.FATAL;
}
/**
 * mfp log fatal
 * used for unrecoverable crashes or hangs
 *
 * @returns
 */
export function mfpFatal(log) {
    if (mfpLogger)
        mfpLogger.fatal(log);
}
