/* eslint-disable @typescript-eslint/no-explicit-any */
import { debug, isDebug } from './fn/logger/debug.fn';
import { error, isError } from './fn/logger/error.fn';
import { fatal, isFatal } from './fn/logger/fatal.fn';
import { info, isInfo } from './fn/logger/info.fn';
import { isWarning, warning } from './fn/logger/warning.fn';
/**
 * Logger 基礎父類
 */
export class BaseLogger {
    /**
     * log是否為Debug層級
     */
    isDebug() {
        return isDebug();
    }
    /**
     * log是否為Info層級
     */
    isInfo() {
        return isInfo();
    }
    /**
     * log是否為Warn層級
     */
    isWarning() {
        return isWarning();
    }
    /**
     * log是否為Error層級
     */
    isError() {
        return isError();
    }
    /**
     * log是否為Fatal層級
     */
    isFatal() {
        return isFatal();
    }
    /**
     * log debug level
     */
    debug(...logs) {
        debug(...logs);
    }
    /**
     * log info level
     */
    info(...logs) {
        info(...logs);
    }
    /**
     * log warning level
     */
    warning(...logs) {
        warning(...logs);
    }
    /**
     * log error level
     */
    error(...logs) {
        error(...logs);
    }
    /**
     * log fatal level
     */
    fatal(...logs) {
        fatal(...logs);
    }
}
